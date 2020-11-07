var express = require('express');
var router = express.Router();
const { matchedData } = require('express-validator/filter');
const MemberPricing = require('../models/membership.js');
const multiparty = require('multiparty');

router.get('/', (req, res, next) => {
    MemberPricing.find({})
    .then(member => {
        res.status(200).json({ 
            member
        });
    })
    .catch(next);
})

router.put('/', (req, res, next)=> {
    let form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        Object.keys(fields).forEach((k) => {
            let query = {usertype: k};
            let filter = {pricing: fields[k][0]};
            console.log(query);
            console.log(filter);
            MemberPricing.findOneAndUpdate(query, filter, {
                new: true,
                useFindAndModify: false
            })
            .then(member=>{
                res.json({ 
                    member
                });
            })
            .catch(err=> {
                next(err);
            })
        })
    });
})

module.exports = router;