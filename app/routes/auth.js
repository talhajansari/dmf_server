var jwt = require('jsonwebtoken');
var passport = require('./passport')
var authhelper = require('./auth_helper');

module.exports = function (router) {

  handleAuthToken = function (req, res) {
    
    var user = req.user;
    
    // create a token
    var secret_key_common = req.app.get('superSecret');

    var token = jwt.sign(user,  secret_key_common, {
      expiresIn: 1440*60 // expires in 24 hours
    });
    console.log(token);
    // return the information including token as JSON
    return res.json({
      success: true,
      error: null,
      message: 'Enjoy your token!',
      data: {token: token}
    });
      
  };

  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); } //error exception
     // user will be set to false, if not authenticated
      if (!user) {
          return res.json({ success: false, error: null, message: 'Authentication failed. User not found.', data: null });
      } 
      // if user authenticated maintain the session
      req.logIn(user, {session: false}, function(err) {
        if (err) { return next(err); } //error exception
        // do whatever here on successful login
        return handleAuthToken(req, res);
      })
    })(req, res, next);
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


}
