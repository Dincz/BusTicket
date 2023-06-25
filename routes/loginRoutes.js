const express = require("express");
const { Register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/Register", Register);
router.post("/Login", login);
module.exports = router;
