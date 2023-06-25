/* eslint-disable prefer-regex-literals */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require("joi");

const schemaReg = Joi.object({
    name: Joi.string().alphanum().min(3).max(30)
        .required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

    repeat_password: Joi.string().valid(Joi.ref("password")).required(),

    email: Joi.string().email().lowercase().required(),

    gender: Joi.string().required(),
    mobile: Joi.string().required(),
    role: Joi.string().default("user"),
});

const schemaLogin = Joi.object({

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

    email: Joi.string().email().lowercase().required(),

});

module.exports = {
    schemaReg,
    schemaLogin,
};
