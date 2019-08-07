var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require("body-parser");
var logger = require('morgan');
var expressValidator = require('express-validator');

var session = require('express-session');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var expressHandlebars = require('express-handlebars');

var indexRouter = require('./routes/index.js');
var usersRouter = require('./routes/users.js');
var aboutRoute = require('./routes/about.js');
var formRoute = require('./routes/forms.js');
var incidentpost = require('./routes/incident.js');
var signupRoute = require('./routes/signup.js');
var loginRouter = require('./routes/login.js');

var app = express();

app.use(session( {
    secret: "wat",
    cookie: {
        path: '/',
        httpOnly: false
    }
}))
// app.use(cookieSession( {
//     name: 'user',
//     keys: ['wat']
// }))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRoute);
app.use('/about/forms', formRoute);
app.use('/incidents',incidentpost);
app.use('/signup', signupRoute);
app.use('/login', loginRouter);

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
    res.render('error');
});

module.exports = app;