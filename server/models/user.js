const mongoose = require("mongoose");

// define schema for user collection (user model)
const userDataSchema = new mongoose.Schema(
  {
    usertype: {
      type: String,
      enum: ["student", "regular"],
    },
    bio: {
      first_name: { type: String },
      last_name: { type: String },
      phone_number: { type: String },
      email: { type: String, index: true, unique: true },
      gender: { type: String },
      institute: { type: String },
    },
    memberid: {
      type: String,
      required: false,
    },
    expirationdate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// export user model to app
module.exports = mongoose.model("UserData", userDataSchema);
module.exports.UserDataSchema = userDataSchema;
