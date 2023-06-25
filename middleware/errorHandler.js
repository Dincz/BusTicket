/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
module.exports = (error, req, res, next) => {
    console.log(error, "thisra");
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    });
};
