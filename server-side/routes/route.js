const router = require("express").Router();
const multer = require("multer"); 
const aws = require("aws-sdk"); 
const multerS3 = require("multer-s3"); 
let File = require("../models/model"); 
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');
const passport = require('../config/jwt-passport');
const s3 = new aws.S3({
    accessKeyId: process.env.EASYSHARE_ACCESS_KEY_ID,
    secretAccessKey: process.env.EASYSHARE_SECRET_ACCESS_KEY_ID,
    Bucket: process.env.EASYSHARE_BUCKET,
});
const upload = multer({
    storage: multerS3({
        s3,
        acl: "public-read",
        bucket: process.env.EASYSHARE_BUCKET,
        key: function (req, file, cb) {
            cb(null, `${new Date().getTime()}__${file.originalname}`);
        },
    }),
    limits: {
        fileSize: 100000000,
    },
    fileFilter(req, file, cb) {
        if (
            !file.originalname.match(
                /\.(jpeg|jpg|png|webp|gif|pdf|doc|docx|xls|xlsx|svg|ppt|pptx)$/
            )
        ) {
            return cb(
                new Error(
                    "Unsupported file format, please choose a different file and retry."
                )
            );
        }
        cb(undefined, true);
    },
});

router.post(
    "/",
    upload.single("file"),
    (req, res) => {
        const { key, mimetype, location } = req.file;
        const lastUnderScore = key.lastIndexOf("__");
        const file_name = key.slice(lastUnderScore + 2);
        const file = new File({
            file_key: key,
            file_mimetype: mimetype,
            file_location: location,
            file_name,
        });
        file.save()
            .then(() => {
                File.findOne({ file_key: key })
                    .then((file) => {
                        res.json(file);
                    })
                    .catch((err) => res.status(400).send(`Error: ${err}`));
            })
            .catch((err) => res.status(400).json(`Error: ${err}`));
    },
    (error, req, res, next) => {
        if (error) {
            res.status(500).send(error.message);
        }
    }
);
router.get("/:id", (req, res) => {
    File.findById(req.params.id)
        .then((file) => {
            res.set({
                "Content-Type": file.file_mimetype,
            });
            const params = {
                Key: file.file_key,
                Bucket: process.env.EASYSHARE_BUCKET,
            };
            s3.getObject(params, (err, data) => {
                if (err) {
                    res.status(400).json(`Error: ${err}`);
                } else {
                    res.download(data);
                }
            });
        })
        .catch((err) => res.status(400).json(`Error: ${err}`));
});
router.delete("/", (req, res) => {
    File.deleteMany({}).then(() => res.json("All files deleted"));
});
router.post('/user_signup', async (req,res) =>  {
    let data = await Users.create(req.body);
    if(data) res.status(200).json('working fine');
    else res.status(404).json('not correct');       
})
// router.post('/user_login',async function(req,res){
//     let user = await Users.findOne({email:req.body.email});
//     if(!user) return res.json(402,{
//         message:"worng crendentials"
//     });
//     if(user)
//     {
//         if(user.password != req.body.password)
//         {
//             return res.json(402,{
//                 message:"worng crendentials"
//             });
//         }
//         return res.json(200,{
//             message:"logged in successfully",
//             data: jwt.sign(user.toJSON(),'secret')
//         })
//     }
//  } 
// )
// router.get('/user/profile',passport.authenticate('jwt',{session:false}),async function(req,res)
// {    
     
//      let user  =await Users.findOne({id:req.email});
//      if(user) 
//      {
//         console.log(user);
//      }
   
//     return res.status(200).json({user:user});
   
// })
module.exports = router;
