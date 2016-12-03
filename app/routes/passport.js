
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../models/user');

// Define the Login Strategy for Passport.js
passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  function(email, password, done) {
    console.log('Finding user!');
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

// Define the Sign Strategy for Passport.js
passport.use('local-signup', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback : true},
  function(req, email, password, done) {
    console.log('Finding one!');
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (user) {
        console.log('User exists');
        return done(null, false, { message: 'The email is already taken.' });

      } else {
        console.log('Creating user');
        var user = new User();
        user.email = req.body.email;
        user.password = user.generateHash(req.body.password);
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.gender = req.body.gender;
        user.is_patient = req.body.is_patient;
        user.is_doctor = req.body.is_doctor;
        user.created_by = 'app_express';
        user.updated_by = 'app_express';

        user.save(function(err) {
          console.log('Finalizing..');
          if (err) { return done(err); }
          console.log('User Created.');
          return done(null, user, {message: 'User Created!'});
        });
      }
    });
  }
));

module.exports = passport;
