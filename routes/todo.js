const express = require("express");
const router = express.Router();

const { index, add, show, deleteOne } = require("../controllers/todo");
const checkToken = require("../middleware/checkToken");


router.route("/").get(checkToken, index);
router.route("/task/new").post(checkToken, add);
router.route('/task/:id').get(checkToken, show);
router.route('/task/:id').delete(checkToken, deleteOne);

module.exports = router;
