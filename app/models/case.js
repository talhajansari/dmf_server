var mongoose     = require('mongoose');

var CaseSchema   = new mongoose.Schema({

    patient: { type: mongoose.Schema.ObjectId, ref: 'Patient' },
    case_type: {
      type: String,
      enum: ['rash', 'pimple', 'other']
    },
    body_part: {
      type: String,
      enum: ['neck', 'chest', 'shoulder', 'arm', 'hand', 'back', 'leg', 'foot', 'other']
    },
    duration_days: Number,

    description: String,
    pictures: [String],

    created_on: {type: Date, default: Date.now},
    created_by: {type: String, required: true},
    updated_on: {type: Date, default: Date.now},
    updated_by: {type: String, required: true}
  });

// methods ======================

Case = mongoose.model('Case', CaseSchema);


module.exports =  Case;
