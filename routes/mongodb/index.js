var express = require('express');
var router = express.Router();
var path = require('path');
var mongo = require('./mongodbController.js');

//var student = require(path.join(__dirname, '../../controllers/studentController'));
//const ROLES_LIST = require('../../config/userroles');
//const verifyRoles = require('../../middleware/verifyRoles');
router.route('/')
    .get(mongo.getCollection)
    .post(mongo.Logindb)
    ;
router.route('/logout')
    .post(mongo.Logoutdb)
    ;
// router.route('/download/:file')
//     .get(mongo.getDownload)
//     ;
module.exports = router;