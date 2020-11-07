const mongoose = require("mongoose");

const memberPricingSchema = new mongoose.Schema(
    {
        usertype: {
            type: String,
            enum: ['undergrad', 'graduate', 'nt-faculty', 'faculty', 'postdoc', 'scholar', 'non-member']
        },
        pricing: {
            type: String,
        }
    }
)

module.exports = mongoose.model('MemberPricing', memberPricingSchema);
module.exports.memberPricingSchemaa = memberPricingSchema;
