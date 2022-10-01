const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).json({ msg: "Welcome to my api of todo-list with auth!" });
});


module.exports = router;