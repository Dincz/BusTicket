/* eslint-disable consistent-return */
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
const { constants } = require("../constants");
const { schemaReg, schemaLogin } = require("../validator/auth");
// desc: Registration of new Admin.
// POST : admin/adminRegister
const adminRegister = asyncHandler(async (req, res) => {
    const result = await schemaReg.validateAsync(req.body);
    const adminAvailable = await admin.findOne({ email: result.email });
    if (adminAvailable) {
        return res.status(constants.VALIDATION_ERROR).json({ message: "You are already registered" });
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.password, salt);
    const hashedRepeatPassword = await bcrypt.hash(result.repeat_password, salt);

    const newAdmin = await admin.create({
        name: result.name,
        email: result.email,
        password: hashedPassword,
        mobile: result.mobile,
        gender: result.gender,
        repeat_password: hashedRepeatPassword,
    });

    res.status(constants.SUCCESSFUL_POST).json(`New admin successfully registered: ${newAdmin.name}`);
});

// desc: Login of Admin
// POST: admin/adminLogin
const adminLogin = asyncHandler(async (req, res) => {
    const result = await schemaLogin.validateAsync(req.body);
    const { password } = result;
    const Admin = await admin.findOne({ email: result.email });
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

module.exports = { adminRegister, adminLogin };
