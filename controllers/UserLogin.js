const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {constants} = require("../constants");

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, gender , mobile } = req.body;
    if (!name || !email || !password || !gender || !mobile) {
        throw new Error(constants.VALIDATION_ERROR);
    }
    // const userAvailable = await User.findOne({ email });
    // if (userAvailable) {
    //     throw new Error(constants.VALIDATION_ERROR);
    // }
    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        gender,
        mobile,
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(constants.SUCCESSFULL_REQUEST).json({  email: user.email });
    } else {
        throw new Error(constants.VALIDATION_ERROR);
    }
});

module.exports = {registerUser};