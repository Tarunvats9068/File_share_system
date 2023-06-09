const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const fileSchema = new Schema(
    {
        file_key: { type: String, required: true, trim: true }, 
        file_mimetype: { type: String, required: true, trim: true }, 
        file_location: { type: String, required: true, trim: true },
        file_name: { type: String, required: true, trim: true }, 
    },
    {
        timestamps: true,
    }
);

fileSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 * 24 * 2 });
const File = mongoose.model("File", fileSchema);

module.exports = File;
