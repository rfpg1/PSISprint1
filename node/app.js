var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var muralRouter = require('./routes/mural');
var photosRouter = require('./routes/photos');


var cors = require('cors')
    /*
    const expressApp = express();

    expressApp.use(cors({
        origin: "*",
        "methods": "GET,PUT,POST",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }));
    */
var app = express();
/*
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/
app.use(cors())

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://psi004:psi004@localhost:27017/psi004?retryWrites=true&authSource=psi004';
//var mongoDB = 'mongodb+srv://rfpg1:rfpg1@cluster0.p6brr.mongodb.net/PSITP4?retryWrites=true&w=majority'
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.json({ limit: '1000mb' }));
app.use(express.urlencoded({ limit: '1000mb', parameterLimit: 100000, extended: false }));

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/mural', muralRouter);
app.use('/photo', photosRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

module.exports = app;