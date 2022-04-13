var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var serveStatic = require('serve-static')
var _ = require('lodash');
var fs = require('fs');
var setDate = require('date-fns');
var cors = require('cors');
var whiteLists = require('./util/accessLists');
const { v4: uuidv4 } = require('uuid')


logger.token('pid', (req, res) => {
  return process.pid;
});
logger.token('uuid', (req, res) => {
  return uuidv4();
});
logger.token('date', (req, res, tz) => {
  return setDate.format(new Date(), "dd-mm-yyyy hh:mm:ss a");
});
logger.format('myformat', ':pid - :remote-addr - :remote-user :date ":method :url HTTP/:http-version" :status - :uuid -:response-time ms');
//:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
  flags: 'a'
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('myformat', { stream: accessLogStream }));
//console.log(cors);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const setCustomCacheControl = (res, path) => {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}
app.use(serveStatic(path.join(__dirname, 'public/ftp'), {
  //setHeaders: setCustomCacheControl
}));
//app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }))

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function Calldown(e) {
  let err = e;
  err = err || e;
  if (err) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

process.on('SIGTERM', (e) => {
  console.log('Received SIGTERM');

  Calldown(e);
});

process.on('SIGINT', (e) => {
  console.log('Received SIGINT');

  Calldown(e);
});

process.on('uncaughtException', err => {
  console.log('Uncaught exception');
  console.error(err);

  Calldown(err);
});
module.exports = app;
