const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    longDesc: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
    },
    picSrc: {
      type: String,
      required: true,
    },
    learnMoreLink: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// export Transaction model to app
const event = mongoose.model("event", eventSchema);
module.exports = event;
