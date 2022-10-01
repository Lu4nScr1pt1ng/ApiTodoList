const express = require("express");
const router = express.Router();

const { register, login, user } = require("../controllers/auth");
const checkToken = require("../middleware/checkToken");


router.route("/register").post(register);
router.route("/login").post(login);
router.route("/user").get(checkToken, user);

module.exports = router;
