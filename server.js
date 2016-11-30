// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
var passport   = require('passport');
var app        = express();                // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 8080;        // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dermifi')
var User     = require('./app/models/user');







// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging, and validation here.
    console.log('API request made to:');
    console.log(req);
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'Test: Hooray! welcome to our api!' });
});

// More routes for our API will happen here
router.route('/login')
  .post(function(req, res) {
    passport.authenticate()
  });

// create a user (accessed at POST http://localhost:8080/api/user)
router.route('/users')
  .post(function(req, res) {
    var user = new User();
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.is_patient = req.body.is_patient;
    user.is_doctor = req.body.is_doctor;

    user.save(function(err) {
      if (err)
        res.send(err)
      res.json({ message: 'User created!' });
    });

  })

  // get all the users (accessed at GET http://localhost:8080/api/users)
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  });

  // get a specific user (accessed at POST http://localhost:8080/api/user/:user_id)
  router.route('/user/:user_id')
    .get(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    });
    .put(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          res.send(err)

      });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);










// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
