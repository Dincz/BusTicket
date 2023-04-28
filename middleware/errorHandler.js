const { constants } = require("../constants");

const errorHandler = (err, req, res) =>{
    const errorMessage = err.message;

    switch(errorMessage){
        case constants.VALIDATION_ERROR.toString():{
            res.status(constants.VALIDATION_ERROR).json({
                message: "validaion failed"
            });
            break;
        }
        case constants.UNATHORIZED.toString():{
            res.status(constants.UNATHORIZED).json({
                message: "Authorization failed"
            });
            break;
        }
        case constants.FORBIDDEN.toString():{
            res.status(constants.FORBIDDEN).json({
                message: "No Access"
            });
            break;
        }
        case constants.NOT_FOUND.toString():{
            res.status(constants.NOT_FOUND).json({
                message: "Not Found"
            });
            break;
        }
        case constants.SERVER_ERROR.toString():{
            res.status(constants.SERVER_ERROR).json({
                message: "Internal Server Error"
            });
            break;
        }
        case constants.SUCCESSFULL_REQUEST.toString():{
            res.status(constants.SUCCESSFULL_REQUEST).json({
                message: "Successfull"
            });
            break;
        }

    }

};

module.exports = errorHandler;


