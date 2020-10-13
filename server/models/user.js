const mongoose = require('mongoose');

// define schema for user collection (user model)
const userDataSchema = new mongoose.Schema(
  {
    usertype: {
      type: String,
      enum: ['student', 'faculty', 'other']
    },
    firstName: { type: String },
    lastNname: { type: String },
    email: { type: String, index: true, unique: true },
    password: {type: String},
    institute: {type: String},
    membership: {
        type: Boolean,
        required: false
    },
    expirationdate: {
        type: Date,
        required: false
    }
  },
  {
    timestamps: true
  }
);

// export user model to app
module.exports = mongoose.model('UserData', userDataSchema);
module.exports.UserDataSchema = userDataSchema;
