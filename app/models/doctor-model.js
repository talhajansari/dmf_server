var mongoose     = require('mongoose');

var DoctorSchema   = new mongoose.Schema({

    picture: String
    hospital_name: String,
    hospital_address_1: String,
    hospital_address_2: String,
    hospital_city: String,
    hospital_country: String,
    hospital_zip_code: String,

    qualification: String,
    medical_school: String,
    graduation_year: String,
    rating: Number,


    created_on: {type: Date, default: Date.now},
    created_by: {type: String, required: true},
    updated_on: {type: Date, default: Date.now},
    updated_by: {type: String, required: true},

    });
// methods ======================

Doctor = mongoose.model('Doctor', DoctorSchema);


module.exports =  Doctor;
