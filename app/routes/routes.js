
/* =============================================================================
 INITIALIZE
===============================================================================*/
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

/** =============================================================================
 METHODS
===============================================================================*/

router.methods = {};
router.methods.response = function(res, error, success, data) {
    res.json({
      error: error,
      success: success,
      data: data
    });
}
router.methods.responseData = function(res, data) {
    res.json({
      error: null,
      success: true,
      data: data
    });
}

router.methods.responseError = function(res, error) {
    res.json({
      error: error,
      success: false,
      data: null
    });
}

router.methods.responseUnauthorized = function(res) {
    res.json({
      error: "Unauthorized Request",
      success: false,
      data: null
    });
}

router.methods.authenticateToken = function (req, res, next) {
  return router.methods.isAuthorized(req, res, 
  	function(is_authenticated, decoded) {
  		if (!is_authenticated) {
  			return router.methods.responseUnauthorized(res);
  		}
  		req.session_object = decoded;
  		return next();
  	});
}

router.methods.isAuthorized = function (req, res, cb) {
  
  var token =  req.headers['authorization']
  jwt.verify(token, req.app.get('superSecret'), function(err, decoded){
    
    if (err) { 
    	return cb(false, null);
    }
    if (!decoded) {
    	return cb(false, null);
    }

    if (!decoded.is_active) {
    	console.log("something worng");
    	return cb(false, null);
    }

    return cb(true, decoded);
  });
}

router.methods.isAuthenticated = function (req, res, cb) {
  
  if (req.session_object && req.session_object.user && req.session_object.user_type) {
  	return cb();
  }
  return router.methods.responseError('Token not authenticated!')
}

// should only be called after token authentication
router.methods.isPatient =  function (req, res, next) {
  router.methods.isAuthenticated(req, res, function() {
  	if (!req.session_object.user.is_patient) {
  		return router.methods.responseError('User is not a patient!');
  	}
  	if (req.session_object.user_type != 'patient') {
  		return router.methods.responseError('User authenticated as a patient!');
  	}
  	return next();

  })
}

/* =============================================================================
 Middleware
===============================================================================*/
router.use(function(req, res, next) {
    // do logging, and validation here.
    console.log('API request made to: ' + req.url);
    console.log(req.headers);
    console.log(req.params);
    console.log(req.body);
    next(); // make sure we go to the next use functions and don't stop here
});

/* =============================================================================
 Test Routes
===============================================================================*/
router.get('/ping', function(req, res) {
	console.log(req.session_object);
  router.methods.responseData(res, "Pong");
});

router.get('/auth/ping', router.methods.authenticateToken, function(req, res) {
  console.log(req.session_object);
  router.methods.responseData(res, "Pong");
});

router.post('/ping', function(req, res) {
  console.log(req.body);
  router.methods.responseData(res, ['Pong',req.body]);
});

/* =============================================================================
 Include Routes
==============================================================================*/

require('./auth')(router);
require('./user')(router);
require('./case')(router);

/* =============================================================================
End
===============================================================================*/
module.exports = router;
