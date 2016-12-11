
var jwt = require('jsonwebtoken');
var AuthHelper = {};




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
