const express = require('express');
const router = express.Router();
const codeController = require("../../controllers/code/codeController");
router.get('/', (req, res) => {
    res.render('code/home', { title: "HOME" });
});

module.exports = router
