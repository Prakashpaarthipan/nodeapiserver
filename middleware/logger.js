
var path = require('path');
var fs = require('fs');
var fspromises = require('fs').promises;
var { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid')

const logEvent = async (message, fileName) => {
    let DateTime = format(new Date(), "dd-MM-yyyy hh:mm:ss a");
    let Logs = `${DateTime}\t ${uuidv4()}\t ${message}\n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '../logs'))) {
            fspromises.mkdir(path.join(__dirname, '../logs'));
        }
        await fspromises.appendFile(path.join(__dirname, '../logs', fileName), Logs);
    } catch (err) {
        console.log(err.message)
    }
};
const serverLog = (err, req, res, next) => {
    logEvent(`${err.message} \t ${req.method} \t ${req.url} \t ${req.headers.origin}`, 'req.log');
    next();
}
module.exports = { serverLog, logEvent };
