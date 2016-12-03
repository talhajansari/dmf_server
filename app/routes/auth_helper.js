
var jwt = require('jsonwebtoken');
var AuthHelper = {};

AuthHelper.authenticateUser = function (req, res) {
    var user = req.user;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.isValidPassword(req.body.password)) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
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
  };


AuthHelper.ensureAuthentication = function (req, res, next) {
  console.log('ensuring authentication');
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
    if (err) { return res.send(err); }
    if (!decoded) {
      return false;
    }
    return next();
  });
}

module.exports = AuthHelper;
