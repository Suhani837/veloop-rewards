const express = require("express");

const {createCaptcha} = require("../controllers/captcha.controller");

const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.post("/create",authMiddleware,createCaptcha);

module.exports = router;