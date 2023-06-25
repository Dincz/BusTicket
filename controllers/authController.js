/* eslint-disable consistent-return */
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginSchema = require("../models/loginSchema");
const { constants } = require("../constants");
const { schemaReg, schemaLogin } = require("../validator/auth");
// desc: Registration of new Admin.
// POST : admin/adminRegister
const Register = asyncHandler(async (req, res) => {
    const result = await schemaReg.validateAsync(req.body);
    const adminAvailable = await loginSchema.findOne({ email: result.email });
    if (adminAvailable) {
        return res.status(constants.VALIDATION_ERROR).json({ message: "You are already registered" });
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(result.password, salt);
    const hashedRepeatPassword = await bcrypt.hash(result.repeat_password, salt);

    const newAccount = await loginSchema.create({
        name: result.name,
        email: result.email,
        password: hashedPassword,
        mobile: result.mobile,
        gender: result.gender,
        repeat_password: hashedRepeatPassword,
        role: result.role,
    });

    res.status(constants.SUCCESSFUL_POST).json(`New account successfully registered: ${newAccount.name}`);
});

// desc: Login of Admin
// POST: admin/adminLogin
const login = asyncHandler(async (req, res) => {
    const result = await schemaLogin.validateAsync(req.body);
    const { password } = result;
    const Login = await loginSchema.findOne({ email: result.email });
    if (Login && (await bcrypt.compare(password, Login.password))) {
        const accessToken = jwt.sign({
            Login: {
                username: Login.name,
                email: Login.email,
                id: Login.id,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.EXPIRE_TIME}m` });
        res.status(constants.SUCCESSFUL_REQUEST).json({ accessToken });
    } else {
        res.status(constants.UNAUTHORIZED);
    }
});

module.exports = { Register, login };
