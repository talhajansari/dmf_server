
// ROUTES FOR OUR API
// =============================================================================
var express = require('express');

var User = require('../models/user');

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

  passport.use(new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    function(email, password, done) {
      User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.isValidPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      if (err) { return done(err); }
      done(null, user);
  });
});

var ensureAuthentication = function (req, res, next) {
  console.log('ensuring authentication');
  if (req.isAuthenticated())
      return next();
  else
    res.json({ message: 'User not authenticated!'});
  }

var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging, and validation here.
    console.log('API request made to: ' + req.url);
    next(); // make sure we go to the next use functions and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/ping', function(req, res) {
  res.json({ message: 'Pong!'});
});

// More routes for our API will happen here
router.post('/authenticate', passport.authenticate('local'), function(req, res) {
  console.log('Authentcation Successful');
  return res.send(req.user);
});

router.get('/logout', function(req, res) {
  if (req.isAuthenticated()) {
    console.log('Logged out');
    req.logout();
    res.json( {message: "User Logged out!"} );
  } else {
    res.json( {message: "User not logged in."} );
  }



});

// create a user (accessed at POST http://localhost:8080/api/user)
router.route('/users')
  .post(function(req, res) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.gender = req.body.gender;
    user.is_patient = req.body.is_patient;
    user.is_doctor = req.body.is_doctor;
    user.created_by = req.body.created_by;
    user.updated_by = req.body.updated_by;

    user.save(function(err) {
      if (err)
        res.send(err)
      res.json({ message: 'User created!' });
    });

  })

  // get all the users (accessed at GET http://localhost:8080/api/users)
  .get(ensureAuthentication, function(req, res) {
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
    })
    .put(function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          res.send(err)

      });
    });

module.exports = router;
