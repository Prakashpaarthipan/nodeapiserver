var express = require('express');
var router = express.Router();
var { OracleTest } = require('../../../config/oracledb.config');
var App = require('../../../controllers/oracle/approvalController');

var { select_query, closePoolAndExit } = require('../../../controllers/oracle/basicController');

router.get('/', async function (req, res) {
    const opts = {};
    const employee = await select_query('select * from employee_office where empcode  in (20169,11032)', 'oraclelive', opts);
    const data = await App.checkLastRowError();
    res.status(200).json({ result: employee, d: data.rows });
});
router.post('/', async function (req, res) {
    //console.log(req.body);
    res.status(200).json({ result: 'posted data', postdata: req.body })
});

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);
module.exports = router