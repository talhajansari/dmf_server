var jwt = require('jsonwebtoken');
var passport = require('./passport');
var SessionObject = require('../models/session-object-model');

module.exports = function (router) {

  router.post('/login', function(req, res, next) {
    
    passport.authenticate('local', function(err, data) {

      if (err) {
        return router.methods.response(res, err, false, null); 
      } 
      if (!data.user) {
        return router.methods.response(res, data.message, false, null);
      } 
      
      req.logIn(data.user, {session: false}, function(err) {

        if (err) {
          return router.methods.response(res, err, false, null); 
        }

        req.user_type = data.user_type;
        return setAuthToken(req, res, function(token) {
           return router.methods.response(res, null, true, {token: token, user: req.user, user_type: req.user_type});
        });
      })

    })(req, res, next);

  });


  router.get('/logout', function(req, res) {
    
    router.methods.isAuthorized(req, res, function(success) {
      if (success) {
        console.log('Log out now!');
        return router.methods.responseData(res, "Log out now!");
      }
      return router.methods.response(res, "User not authenticated!", true, null);
    })

  });


  var setAuthToken = function (req, res, cb) {
    
    var session_object = new SessionObject(req.user, req.user_type, true)
    // create a token
    var secret_key_common = req.app.get('superSecret');

    var token = jwt.sign(session_object,  secret_key_common, {
      expiresIn: 720*60 // expires in 12 hours
    });
    // return the information including token as JSON
    return cb(token);
      
  };


}
