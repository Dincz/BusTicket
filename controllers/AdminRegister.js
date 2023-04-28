const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const admin = require("../models/admin");
const { constants } = require("../constants");

const resgisterAdmin = asyncHandler(async (req, res) => {
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
        res.status(constants.SUCCESSFULL_REQUEST).json({ name: Admin.name });
    } else {
        throw new Error(constants.VALIDATION_ERROR);
    }
});

module.exports = { resgisterAdmin };
