/* eslint-disable consistent-return */
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { constants } = require("../constants");
// desc: Registration of new user.
// POST : userRegister
const userRegister = asyncHandler(async (req, res) => {
    const {
        name, email, password, mobile, gender,
    } = req.body;
    if (!name || !email || !password || !mobile || !gender) {
        return res.status(constants.VALIDATION_ERROR).json({ message: "All fields are mandatory" });
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        return res.status(constants.VALIDATION_ERROR).json({ message: "You are already registered" });
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        mobile,
        gender,
    });

    res.status(constants.SUCCESSFUL_POST).json(newUser);
});
// desc: Login of user.
// POST : userLogin
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

module.exports = { userRegister, userLogin };
