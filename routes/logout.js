var express = require('express');
var router = express.Router();
const LogoutController = require('../controllers/logoutController');
/* GET home page. */
router.get('/', LogoutController.handleLogout);

module.exports = router;