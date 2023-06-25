const express = require("express");
const { userRegister, userLogin } = require("../controllers/UserRegister");

const router = express.Router();

router.post("/userRegister", userRegister);
router.post("/userLogin", userLogin);

module.exports = router;
