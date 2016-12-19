/* =============================================================================
 Case Routes
===============================================================================*/
var Case = require('../models/case-model');

module.exports = function (router) {


/* ==== CREATE CASE =====*/

  router.post('/case/create', 
    router.methods.authenticateToken, 
    router.methods.isPatient,
    function(req, res) {

      console.log('Case Create Request');
      var new_case = new Case();
      new_case.patient = req.user._id;
      new_case.case_type = req.body.case_type;
      new_case.body_part = req.body.body_part;
      new_case.duration_days = req.body.duration_days;
      new_case.description = req.body.description;
      new_case.images = req.body.images;
      new_case.created_by = new_case.updated_by = 'express_app';
      console.log('Case:');
      console.log(new_case);

      new_case.save(function(err) {
        if (err) {
          console.log('case creation error');
          console.log(err);
          return router.methods.responseError(res, err); 
        }
        console.log('Case created..');
        return router.metods.responseData(res, {case: new_case});
      })

    });

/* ==== ALL USER CASES =====*/

router.get('/cases', 
  router.methods.authenticateToken,
  router.methods.isPatient,
  function(req, res) {
    console.log('Cases For User Requested');
    Case.find({'patient': req.session_object.user._id}, function(err, cases) {
      if (err) {
        return router.methods.responseError(res, err); 
      }
      return router.methods.responseData(res, cases);
    });
    
  });

router.get('/case/:case_id', 
  router.methods.authenticateToken,
  router.methods.isPatient,
  function(req, res) {
    console.log('One Case For User Requested');
    Case.findOne({'patient': req.session_object.user._id, '_id': req.params.case_id},
     function(err, cases) {
      if (err) {
        return router.methods.responseError(res, err); 
      }
      return router.methods.responseData(res, cases);
    });
    
  });

}
