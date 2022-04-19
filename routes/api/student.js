var express = require('express');
var router = express.Router();
var path = require('path');
var student = require(path.join(__dirname, '../../controllers/studentController'));
const ROLES_LIST = require('../../config/userroles');
const verifyRoles = require('../../middleware/verifyRoles');
router.route('/')
    .get(student.getAllStudents)
    .post(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), student.createStudents)
    .put(verifyRoles(ROLES_LIST.ADMIN, ROLES_LIST.EDITOR), student.updateStudents)
    .delete(verifyRoles(ROLES_LIST.ADMIN), student.deleteStudents)
    ;

router.route('/:id')
    .get(student.getStudentsById);

module.exports = router;