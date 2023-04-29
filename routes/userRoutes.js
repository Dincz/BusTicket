const express = require("express");
const { registerUser, userLogin } = require("../controllers/UserRegister");

const router = express.Router();

router.post("/registerUser", registerUser);
router.post("/registerLogin", userLogin);

module.exports = router;
