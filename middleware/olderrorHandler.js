/* eslint-disable no-unused-vars */
/* eslint-disable default-case */

const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const errorMessage = err.message;

    switch (errorMessage) {
    case constants.VALIDATION_ERROR.toString(): {
        res.status(constants.VALIDATION_ERROR).json({
            message: "Validation failed",
        });
        break;
    }

    case constants.FORBIDDEN.toString(): {
        res.status(constants.FORBIDDEN).json({
            message: "NO permission to enter",
        });
        break;
    }
    case constants.NOT_FOUND.toString(): {
        res.status(constants.NOT_FOUND).json({
            message: "not found",
        });
        break;
    }

    case constants.UNAUTHORIZED.toString(): {
        res.status(constants.UNAUTHORIZED).json({
            message: "Authorization false",
        });
        break;
    }

    case constants.SERVER_ERROR.toString(): {
        res.status(constants.SERVER_ERROR).json({
            message: "Server Error",
        });
        break;
    }
    }
};

module.exports = errorHandler;
