const express = require("express");
const mongoose = require("mongoose"); 
const cors = require("cors");
const path = require("path"); 
const db = require('./server-side/config/mongoose');
const passport = require('passport');
const JWT = require('./server-side/config/jwt-passport')
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const PORT = process.env.PORT || 5000;


const fileRouter = require("./routes/route");
app.use("/api", fileRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../build", "index.html"));
    });
}
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
