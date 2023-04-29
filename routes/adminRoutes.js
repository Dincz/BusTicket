const express = require("express");
const { registerAdmin, adminLogin } = require("../controllers/AdminRegister");

const router = express.Router();

router.post("/registerAdmin", registerAdmin);
router.post("/adminLogin", adminLogin);
module.exports = router;
