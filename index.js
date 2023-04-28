const express = require("express");
const mongoose = require("mongoose");
const connectDb = require("./Database/connection");
const errorHandle = require("./middleware/errorHandler");
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

require("dotenv").config();
const app = express();

connectDb();

const port = process.env.PORT || 5000

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"));
app.get('/Homepage',(req, res)=>{
    res.send("Hello user");
})

app.use(errorHandle);
app.listen(port,()=>{
    console.log(`Port running on ${port}`);
})

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
	apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(options);


// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(specs));
// const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// console.log("Hello world");