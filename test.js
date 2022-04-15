const EventEmitter = require('events');
var logEvents = require('./middleware/logger');
var events = new EventEmitter();
events.on('log', function (meg) {
    console.log('Called');
    logEvents(meg, 'test.log');
});

setTimeout(() => {
    events.emit('log', 'I got it');
}, 2000)