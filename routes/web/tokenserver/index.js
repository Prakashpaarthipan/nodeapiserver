var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function (req, res) {
    //console.log(path.join(__dirname, 'views/oracle/index.html'));
    res.sendFile(path.join(__dirname, '', 'index.html'));
});
module.exports = router;