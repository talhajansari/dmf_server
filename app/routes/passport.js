
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken');
var User = require('../models/user-model');

// Define the Login Strategy for Passport.js
passport.use(new LocalStrategy(
  
  { usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true },

  function(req, email, password, done) {
    console.log('Finding user!');
    var user_type = req.body.user_type; // optional

    User.findOne({ email: email }, function(err, user) {
      console.log(user);
      if (err) { 
        return done(err, {user: null, user_type: null, message: 'Something went wrong!' });
      }
      if (!user) {
        return done(null, {user: null, user_type: null, message: 'Invalid username'});
      }
      if (!user.is_patient && !user.is_doctor) {
        return done(null, {user: null, user_type: null, message: 'No user type set for the user'});
      }
      if (user_type =='patient' && !user.is_patient) {
        return done(null, {user: null, user_type: null, message: 'User not registered as a patient'});
      }
      if (user_type=='doctor' && !user.is_doctor) {
        return done(null, {user: null, user_type: null, message: 'User not registered as doctor.' });
      }
      if (!user.isValidPassword(password)) {
        return done(null, {user: null, user_type: null, message: 'Invalid password'});
      }

      if (typeof user_type=='undefined' && user.is_patient) {
        return done(null, {user: user, user_type: 'patient', message: 'User found as patient!'});
      }
      if (typeof user_type=='undefined' && user.is_doctor) {
        return done(null, {user: user, user_type: 'patient', message: 'User found as doctor!'});
      }
      return done(null, {user: user, user_type: user_type, message: 'User found!'});
    });
  }
));

// Define the Sign Strategy for Passport.js
passport.use('local-signup', new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', passReqToCallback : true},
  function(req, email, password, done) {
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
