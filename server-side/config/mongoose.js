const mongoose = require('mongoose');

const uri = `mongodb+srv://${process.env.EASYSHARE_USERNAME}:${process.env.EASYSHARE_PASSWORD}@cluster1.wztua67.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection has been established");
});
module.exports = connection;