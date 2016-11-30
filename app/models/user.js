// app/models/bear.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema   = new Schema({
    email: {
      type: String,
      validate: {
        validator: function(v) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
        },
        message: 'Not a valid email address',
      },
      required: true,
      unique: true
    },
    password: String,
    first_name: String,
    last_name: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    dob: Date,
    is_patient: Boolean,
    is_doctor: Boolean,
    created_on: {type: Date, default: Date.now},
    created_by: {type: String, required: true},
    updated_on: {type: Date, default: Date.now},
    updated_by: {type: String, required: true}
});

UserSchema.methods.isValidPassword = function (password) {
  if (this.password == password) {
    return true;
  }
  return false;
}

UserSchema.plugin(passportLocalMongoose);

User = mongoose.model('User', UserSchema);


module.exports =  User;
