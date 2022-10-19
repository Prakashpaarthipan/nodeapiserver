const appServer = require("./server");
var http = require('http');
const PORT = 4040;
var server;
const startServer = async () => {

    appServer.set('port', PORT);
    server = http.createServer(appServer);
    server.listen(PORT, function () {
        var port = server.address().port;
        console.log('Example app listening at port %s', port);

    });
    return 'open';

}

const stopServer = async () => {

    server.close((err) => {
        if (err) return console.error(err);
        console.log('server closed');

    })
    return 'close';
}
module.exports = {
    startServer, stopServer
};