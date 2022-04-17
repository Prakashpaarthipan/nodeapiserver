var express = require('express');
var router = express.Router();
const RefreshController = require('../controllers/refreshTokenController');
/* GET home page. */
router.get('/', RefreshController.handleRefreshToken);

module.exports = router;