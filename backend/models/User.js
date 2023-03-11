const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        // Username - must be unique and fit criteria
        username: {
            type: String,
            required: true,
            unique: true,
            minlength: 1,
            maxlength: 20,
        },
        // Password - will be hashed before storage
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema)
