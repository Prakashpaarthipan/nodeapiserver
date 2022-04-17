var express = require('express');
var router = express.Router();
const AuthController = require('../controllers/authController');
/* GET home page. */
router.post('/', AuthController.handleUserLogin);

module.exports = router;