var jwt = require('jsonwebtoken');
var passport = require('./passport')
var authhelper = require('./auth_helper');

module.exports = function (router) {

  router.post('/authenticate', function (req, res, next) {
    // find the user
   User.findOne({
     email: req.body.email
   }, function(err, user) {

     if (err) throw err;

     if (!user) {
       res.json({ success: false, message: 'Authentication failed. User not found.' });
     } else if (user) {

       // check if password matches
       if (!user.isValidPassword(req.body.password)) {
         res.json({ success: false, message: 'Authentication failed. Wrong password.' });
       } else {

         // if user is found and password is right
         // create a token
         var token = jwt.sign(user, req.app.get('superSecret'), {
           expiresIn: 1440*60 // expires in 24 hours
         });

         // return the information including token as JSON
         res.json({
           success: true,
           message: 'Enjoy your token!',
           token: token
         });
       }

     }

   });
  });

  router.post('/login', passport.authenticate('local', {session: false}), authhelper.authenticateUser);


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
