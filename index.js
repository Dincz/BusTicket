/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const connectDb = require("./Database/connection");
const errorHandler = require("./middleware/errorHandler");
const { constants } = require("./constants");
const CustomError = require("./middleware/customError");
require("dotenv").config();

const app = express();

connectDb();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/v1/buses", require("./routes/busRoutes"));
app.use("/api/v1/account", require("./routes/loginRoutes"));

app.all("*", (req, res, next) => {
    // const err = new Error("Wrong URL ");
    // err.status = "fail";
    // err.statusCode = constants.NOT_FOUND;
    const err = new CustomError(`Can't find ${req.originalUrl} on the server!`, constants.NOT_FOUND);
    next(err);
});

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Port running on ${port}`);
});

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Bus API",
            version: "1.0.0",
            description: "A simple Express BusTicket API",
        },
        servers: [
            {
                url: "http://localhost:2001",
            },
        ],
    },
    apis: ["swagger.js"],
};

const swaggerDocs = swaggerJsDoc(options);

// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(specs));
// const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// console.log("Hello world");
