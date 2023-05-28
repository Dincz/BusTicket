const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const { constants } = require("../constants");

// eslint-disable-next-line consistent-return
const registerAdmin = asyncHandler(async (req, res) => {
    const {
        name, email, password, mobile, gender,
    } = req.body;
    if (!name || !email || !password || !mobile || !gender) {
        return res.status(constants.VALIDATION_ERROR).json({ message: "All fields are mandatory" });
    }
    const adminAvailable = await admin.findOne({ email });
    if (adminAvailable) {
        return res.status(constants.VALIDATION_ERROR).json({ message: "You are already registered" });
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = await admin.create({
        name,
        email,
        password: hashedPassword,
        mobile,
        gender,
    });

    res.status(constants.SUCCESSFUL_POST).json(newAdmin);
});

const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        res.status(constants.NOT_FOUND);
    }
    const Admin = await admin.findOne({ email });
    if (Admin && (await bcrypt.compare(password, Admin.password))) {
        const accessToken = jwt.sign({
            Admin: {
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
