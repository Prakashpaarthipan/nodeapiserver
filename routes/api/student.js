var express = require('express');
var router = express.Router();
var path = require('path');
var student = require(path.join(__dirname, '../../controllers/studentController'));
router.route('/')
    .get(student.getAllStudents)
    .post(student.createStudents)
    .put(student.updateStudents)
    .delete(student.deleteStudents)
    ;

router.route('/:id')
    .get(student.getStudentsById);

module.exports = router;