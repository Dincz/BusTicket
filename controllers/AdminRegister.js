const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const { constants } = require("../constants");

const registerAdmin = asyncHandler(async (req, res) => {
    const {
        name, email, password, mobile, gender,
    } = req.body;
    if (!name || !email || !password || !gender || !mobile) {
        throw new Error(constants.VALIDATION_ERROR);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const Admin = await admin.create({
        name,
        email,
        password: hashedPassword,
        gender,
        mobile,
    });
    console.log(`User created ${Admin}`);
    if (Admin) {
        res.status(constants.SUCCESSFUL_REQUEST).json({ name: Admin.name });
    } else {
        throw new Error(constants.VALIDATION_ERROR);
    }
});
const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(constants.NOT_FOUND);
    }
    const Admin = await admin.findOne({ email });
    if (Admin && (await bcrypt.compare(password, Admin.password))) {
        const accessToken = jwt.sign({
            user: {
                username: Admin.name,
                email: Admin.email,
                id: Admin.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.EXPIRE_TIME}m` });
        res.status(constants.SUCCESSFUL_REQUEST).json({ accessToken });
    } else {
        res.status(constants.UNAUTHORIZED);
    }
});

module.exports = { registerAdmin, adminLogin };
