const mongoose = require('mongoose');

const txnSchema = new mongoose.Schema(
    {
        username: {
          type: String,
          required: true
        },
        date: {
          type: Date,
          required: true
        },
        usertype: {
          type: String,
          required: true,
          enum: ["student", "regular"]
        },
        paymenttype: {
          type: String,
          require: true,
          enum: ["credit", "paypal"]
        },
        txnresult: {
          type: String,
          require: false,
          enum: ["success", "failure"]
        }
      },
      { timestamps: true }
)

// export Transaction model to app
module.exports = mongoose.model('transaction', txnSchema);