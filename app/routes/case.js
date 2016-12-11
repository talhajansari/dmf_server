/* =============================================================================
 Case Routes
===============================================================================*/
var authhelper = require('./auth_helper');
var Case = require('../models/case');

module.exports = function (router) {

  router.post('/case/create', authhelper.ensureAuthentication, function(req, res) {
    console.log('Case Create Request');
  });

  // get all the users (accessed at GET http://localhost:8080/api/users)
  router.get('/users', authhelper.ensureAuthentication, function(req, res) {
    User.find(function(err, users) {
      if (err)
        res.send(err);
      res.json(users);
    });
  });

}
