const mongoose = require("mongoose");

const LoginSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add the  name"],
        },
        email: {
            type: String,
            required: [true, "Please add the  email address"],
        },
        mobile: {
            type: String,
            required: [true, "Please add the contact phone number"],
        },
        gender: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: [true, "Please add the password"],
        },
        repeat_password: {
            type: String,
            required: [true, "Please add the password"],
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
    },
    {
        timestamps: true,
    },

);

module.exports = mongoose.model("Login", LoginSchema);
