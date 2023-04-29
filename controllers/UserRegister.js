const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { constants } = require("../constants");

const registerUser = asyncHandler(async (req, res) => {
    const {
        name, email, password, gender, mobile,
    } = req.body;
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
        res.status(constants.SUCCESSFUL_REQUEST).json({ email: user.email });
    } else {
        throw new Error(constants.VALIDATION_ERROR);
    }
});

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(constants.NOT_FOUND);
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.name,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.EXPIRE_TIME}m` });
        res.status(constants.SUCCESSFUL_REQUEST).json({ accessToken });
    } else {
        res.status(constants.UNAUTHORIZED);
    }
});

module.exports = { registerUser, userLogin };
