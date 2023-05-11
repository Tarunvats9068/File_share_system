const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    email:{
         type:String,
         required:true,
         unique:true
    },
    username:{
        type:String,
         required:true,
    },
    password:{
        type:String,
         required:true,
    }
},{timestamps: true});
const Users = mongoose.model('Users',usersSchema);
module.exports = Users;