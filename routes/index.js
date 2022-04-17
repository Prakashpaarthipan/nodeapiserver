var homeRouter = require('./home');
var moviesRouter = require('./users');
var productRouter = require('./product');
var registerRouter = require('./registerUsers');
var authRouter = require('./authUser');
var refreshRouter = require('./refreshJWT');
var logoutRouter = require('./logout');




module.exports = {
  homeRouter, moviesRouter, productRouter, registerRouter, authRouter, refreshRouter, logoutRouter
} 
