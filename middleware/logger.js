
var path = require('path');
var fspromises = require('fs').promises;
var setDate = require('date-fns');
const { v4: uuidv4 } = require('uuid')

const logEvent = async (message) => {
    let DateTime = setDate.format(new Date(), "dd-mm-yyyy hh:mm:ss a");
    let Logs = `${DateTime}\t ${uuidv4()}\t ${message}`;
    try {
        await fspromises.appendFile(path.join(__dirname), 'logs', 'logs.txt', Logs);
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = logEvent;
