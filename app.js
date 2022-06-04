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
const { v4: uuidv4 } = require('uuid');
const { serverLog } = require('./middleware/logger');
const { homeRouter, moviesRouter, productRouter, authRouter, registerRouter, refreshRouter, logoutRouter } = require('./routes/index');
const { codeRouter } = require('./routes/code/index');

const { productsRouter, studentRouter } = require('./routes/api');
const ftpRouter = require('./routes/ftp');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var verifyJWTToken = require('./middleware/verifyJWT');
const whiteLists = require('./util/accessLists')
const credential = require('./middleware/credential');
var bodyParser = require('body-parser');

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



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('myformat', { stream: accessLogStream }));

//console.log(cors);
app.use(credential);   //only brefore cors
app.use(cors(whiteLists));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data/Product', express.static(path.join(__dirname, 'public')));
const setCustomCacheControl = (res, path) => {
  if (serveStatic.mime.lookup(path) === 'text/html') {
    res.setHeader('Cache-Control', 'public, max-age=0')
  }
}
app.use(serveStatic(path.join(__dirname, 'public/ftp'), {
  //setHeaders: setCustomCacheControl
}));
//app.use(serveStatic('public/ftp', { index: ['default.html', 'default.htm'] }))
app.use(serverLog);
app.use('/', homeRouter);
app.use('/movies', moviesRouter);
app.use('/data/Product', productRouter);
app.use('/users/register', registerRouter);
app.use('/users/auth', authRouter);
app.use('/users/refresh', refreshRouter);
app.use('/users/logout', logoutRouter);

var Apiurl = ['/article2', '/article3'];

//below Route will use JWT
//app.use(verifyJWTToken);
app.use('/api/v1/Products', verifyJWTToken, productsRouter);
app.use('/api/v1/Student', verifyJWTToken, studentRouter);

app.use('/styles',
  express.static(path.join(__dirname,
    'node_modules/highlight.js/styles')));
// app.use('/scripts',
//   express.static(path.join(__dirname,
//     'node_modules/highlight.js/lib')));
app.use('/ftp', ftpRouter);
app.use('/code', codeRouter);

//API Docs
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API DOCS',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Prakash P',
      url: 'github.com/prakashpaarthipan',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(serverLog);

app.use((err, req, res, next) => {
  res.status(500).send(err.message)
});

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });


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
  console.log(err.message, err.name);

  Calldown(err);
});
module.exports = app;
