/* =============================================================================
/ Get the Packsages
/===============================================================================*/

var express    = require('express');
var bodyParser = require('body-parser');
//var cookieParser = require('cookie-parser');
var morgan      = require('morgan');
//var session = require('express-session');
var passport   = require('passport');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var config = require('./config');

var app        = express();

/* =============================================================================
/ Configuration
/===============================================================================*/
var port = process.env.PORT || config.port;        // set our port
mongoose.connect(config.database)

app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(passport.initialize());

/* =============================================================================
 DATA BASE
===============================================================================*/

/* =============================================================================
 ROUTES
===============================================================================*/
var router   = require('./app/routes/routes');

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router); // all of our routes will be prefixed with /api



/* =============================================================================
 Start the Server
===============================================================================*/


app.listen(port);
console.log('Magic happens on port ' + port);
