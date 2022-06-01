const express = require('express');
const router = express.Router();
const codeController = require("../../controllers/code/codeController");
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.render('code/home', { title: "HOME" });
});

module.exports = router
