var express = require('express');
var router = express.Router();
var path = require('path');
const { startServer, stopServer } = require('./simpleserver/app');
router.get('/', function (req, res) {
    // console.log(path.join(__dirname, '../../', 'views/web/servers.html'));
    res.sendFile(path.join(__dirname, '../../', 'views/web/servers.html'));
});
router.get('/simpleserver/start', async function (req, res) {
    let result = await startServer();
    if (result == 'open') res.json({ success: "connected" });


});
router.get('/simpleserver/stop', async function (req, res) {
    let result = await stopServer();
    if (result == 'close') res.json({ success: "disconnected" });

});
module.exports = router;