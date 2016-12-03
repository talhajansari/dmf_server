
/* =============================================================================
 ROUTES FOR OUR API
===============================================================================*/
var express = require('express');

var router = express.Router();

// Middleware to use for all requests
router.use(function(req, res, next) {
    // do logging, and validation here.
    console.log('API request made to: ' + req.url);
    next(); // make sure we go to the next use functions and don't stop here
});

/* =============================================================================
 Test Routes
===============================================================================*/
router.get('/ping', function(req, res) {
  res.json({ message: 'Pong!'});
});

/* =============================================================================
 Autentication
===============================================================================*/





require('./authentication')(router);
require('./user')(router);

/* =============================================================================
End
===============================================================================*/
module.exports = router;
