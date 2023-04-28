const express = require("express");
const { registerAdmin } = require("../controllers/AdminRegister");

const router = express.Router();

router.post("/registerAdmin", registerAdmin);

module.exports = router;
