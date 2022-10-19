const express = require("express");
const app1 = express();
var cors = require('cors');
var path = require('path');
app1.use(express.urlencoded({ extended: true }));
app1.use(express.json());
app1.use(cors());
app1.set('views', path.join(__dirname, 'views'));
app1.set('view engine', 'ejs');

app1.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});
app1.get("/", (req, res) => {
    res.json({
        status: 'listening'
    });
});

app1.use((err, req, res, next) => {
    res.status(500).send(err.message)
    next();
});

// catch 404 and forward to error handler
app1.use(function (req, res, next) {
    //next(createError(404));
    res.status(404);//.render('404');
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.headers['accept'] == 'application/json') {
        res.json({ error: '404 Not Found' })
    } else {
        res.type('txt').send(err.message)
    }
});


// error handler
app1.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
module.exports = app1