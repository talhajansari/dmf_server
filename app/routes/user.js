/* =============================================================================
 User Routes
===============================================================================*/

module.exports = function (router) {
  // create a user (accessed at POST http://localhost:8080/api/user)
  router.post('/user/create', function(req, res, next) {
    console.log('Signup Request');
    passport.authenticate('local-signup', function(err, user, info) {
      console.log('Strategy ran.');
      if (err) { return next(err); }
      if (!user) { return res.send(info); }
      req.logIn(user, function(err){
        // Create a token
        var token = jwt.sign(user, req.app.get('superSecret'), { expiresInMinutes: 1440 });
        return router.response (res, null, {token: token});
      });
    });
  });

  // get all the users (accessed at GET http://localhost:8080/api/users)
  router.get('/users', router.methods.authenticateToken, function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  });

  // get a specific user (accessed at POST http://localhost:8080/api/user/:user_id)
  router.get('/user/:user_id', router.methods.authenticateToken, function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          res.send(err);
        res.json(user);
      });
    })

  router.put('/user/:user_id', router.methods.authenticateToken, function(req, res) {
      User.findById(req.params.user_id, function(err, user) {
        if (err)
          res.send(err)
      });
    });
}
