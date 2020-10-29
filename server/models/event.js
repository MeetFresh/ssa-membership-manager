const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "New Unnamed Event",
    },
    type: {
      type: String,
      enum: ["event", "announcement"],
      default: "event",
    },
    desc: {
      type: String,
      default: "SSA Event",
    },
    longDesc: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    picSrc: {
      type: String,
      default: "",
    },
    learnMoreLink: {
      type: String,
      default: "",
    },
    participants: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

// export user model to app
module.exports = mongoose.model("EventData", eventSchema);
module.exports.UserDataSchema = eventSchema;
