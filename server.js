// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
})
var passport   = require('passport');
var app        = express();                // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 8080;        // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dermifi')


var router   = require('./app/routes/index');







// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);










// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
