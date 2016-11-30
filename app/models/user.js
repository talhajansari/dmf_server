// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema   = new Schema({
    email: {type: String,
            validate: {
              validator: function(v) {
                return "/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/".test(v);
              },
              message: 'Not a valid email address',
            },
            required: true},
    password: String,
    first_name: String,
    last_name: String,
    gender: {type: String, enum: ['male', 'female', 'other'], required: [true, "No gender?"]},
    dob: Date,
    is_patient: Boolean,
    is_doctor: Boolean,
    created_on: {type: Date, default: Date.now},
    created_by: String,
    updated_on: {type: Date, default: Date.now},
    updated_by: String
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
