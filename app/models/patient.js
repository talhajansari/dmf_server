var mongoose     = require('mongoose');

var PatientSchema   = new mongoose.Schema({

    picture: String
    insurance_name: String,
    insurance_member_id: String,
    insurance_group_id: String,
    insurance_card_image: String,

    created_on: {type: Date, default: Date.now},
    created_by: {type: String, required: true},
    updated_on: {type: Date, default: Date.now},
    updated_by: {type: String, required: true},

    });
// methods ======================

Patient = mongoose.model('Patient', PatientSchema);


module.exports =  Patient;
