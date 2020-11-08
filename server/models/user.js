const mongoose = require('mongoose');
const moment = require("moment");
moment().format();

// define schema for user collection (user model)
const userDataSchema = new mongoose.Schema(
  {
    usertype: {
      type: String,
      enum: ['undergrad', 'graduate', 'nt-faculty', 'faculty', 'postdoc', 'scholar', 'non-member']
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    first: { type: String },
    last: { type: String },
    pronoun: {type: String},
    email: { type: String, index: true, unique: true },
    password: {type: String},
    passwordResetToken: { type: String, default: "" },
    
    passwordResetExpires: { type: Date, default: moment().utcOffset(0) },
    institute: {type: String},
    instituteId: {type: String},
    instituteEmail: {type: String},
    profilePic: {type: String},
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
