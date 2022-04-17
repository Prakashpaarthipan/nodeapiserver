var express = require('express');
var router = express.Router();
const UserController = require('../controllers/usersController');
/* GET home page. */
router.post('/', UserController.handleRequest);

module.exports = router;