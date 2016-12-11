// app/models/bear.js

var mongoose     = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var UserSchema   = new mongoose.Schema({

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
    secret_key_specific: String,

    first_name: String,
    last_name: String,
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    dob: Date,

    is_patient: Boolean,
    is_doctor: Boolean,
    admin_level: Number,

    created_on: {type: Date, default: Date.now},
    created_by: {type: String, required: true},
    updated_on: {type: Date, default: Date.now},
    updated_by: {type: String, required: true},

    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
    });
// methods ======================
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.isValidPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

User = mongoose.model('User', UserSchema);


module.exports =  User;
