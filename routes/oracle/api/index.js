var express = require('express');
var router = express.Router();
var { OracleTest } = require('../../../config/oracledb.config');
var App = require('../../../controllers/oracle/approvalController');
var Leave = require('../../../controllers/oracle/leaveController');

var { select_query, closePoolAndExit } = require('../../../controllers/oracle/basicController');

router.get('/', async function (req, res) {
    const opts = {};

    const employee = await select_query('select * from trandata.employee_office@tcscentr where empcode  in (20169,11032)', 'TRANVIEW', opts);
    if (req.query.approvel == 'approve') {
        const data1 = await App.checkLastRowError();
        res.status(200).json({ result: employee.rows, data: data1.rows });
    }
    else if (req.query.leave == 'leave') {
        const data1 = await Leave.checkLeaveError();
        res.status(200).json({ result: employee.rows, data: data1.rows });
    }
    else {
        res.status(404).json({ error: 'nos', employee: employee.rows });
    }

});
router.post('/', async function (req, res) {
    //console.log(req.body);
    res.status(200).json({ result: 'posted data', postdata: req.body })
});

router.get('/monitor/:mode', async function (req, res) {
    let query_result;
    switch (req.params['mode']) {
        case 'approvefinal':
            query_result = await App.checkLastRowError();
            res.status(200).json({ result: query_result.rows });
            break;
        case 'leave':
            query_result = await Leave.checkLeaveError();
            res.status(200).json({ result: query_result.rows });
            break;
        case 'approvedisplay':
            query_result = await App.checkApprovalDisplayissue();
            res.status(200).json({ result: query_result });
            break;
        default:
            res.status(200).json({ result: 'not found' });
            break;
    }
});

process
    .once('SIGTERM', closePoolAndExit)
    .once('SIGINT', closePoolAndExit);
module.exports = router