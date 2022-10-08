var express = require('express');
var router = express.Router();
var path = require('path');
const { startServer, stopServer } = require('./simpleserver/app');
router.get('/', function (req, res) {
    // console.log(path.join(__dirname, '../../', 'views/web/servers.html'));
    res.sendFile(path.join(__dirname, '../../', 'views/web/servers.html'));
});
router.get('/simpleserver/start', async function (req, res) {
    const startState = await startServer();
    console.log(startState);
    if (!startState) {

        res.status(404).send('failed to start');
    } else {
        res.status(200).send('success');
    }

});
router.get('/simpleserver/stop', async function (req, res) {
    if (!await stopServer()) {

        res.status(404).send('failed to stop');
    } else {
        res.status(200).send('success');
    }

});
module.exports = router;