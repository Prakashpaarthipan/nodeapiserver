var express = require('express');
var router = express.Router();
var path = require('path');
var ftp = require('./ftpController.js');

//var student = require(path.join(__dirname, '../../controllers/studentController'));
//const ROLES_LIST = require('../../config/userroles');
//const verifyRoles = require('../../middleware/verifyRoles');
router.route('/')
    .get(ftp.ftpHomePage)
    .post(ftp.ftpAuthPage)
    ;
router.route('/files')
    .get(ftp.getListFiles)
    .post(ftp.ftpupload)
    ;
router.route('/download/:file')
    .get(ftp.getDownload)
    ;
module.exports = router;