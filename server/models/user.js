const mongoose = require('mongoose');

// define schema for user collection (user model)
const userDataSchema = new mongoose.Schema(
  {
    usertype: {
      type: String,
      enum: ['student', 'faculty', 'other']
    },
    first: { type: String },
    last: { type: String },
    pronoun: {type: String},
    email: { type: String, index: true, unique: true },
    password: {type: String},
    institute: {type: String},
    instituteId: {type: String},
    membership: {
        type: Boolean,
        required: false
    },
    registrationdate: {
      type: Date,
      required: false
    },
    expirationdate: {
        type: Date,
        required: false
    },
    activityhistory: { 
      type: [String],
      required: false,
      default: []
    },
  },
  {
    timestamps: true
  }
);

// export user model to app
module.exports = mongoose.model('UserData', userDataSchema);
module.exports.UserDataSchema = userDataSchema;
