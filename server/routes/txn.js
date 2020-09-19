const express = require('express');
const router = express.Router();
// const { validationResult } = require('express-validator/check');
// const { matchedData } = require('express-validator/filter');
const TxnData = require('../models/txn');

// router.post('/', (req, res, next) => {
//     const newTxnData = matchedData(req);
//     const newTxn = new TxnData(newTxnData);
//     newEvent
//         .save()
//         .then(() => {
//             res.json({
//                 message: 'Txn successfully created!'
//             });
//         })
//         .catch(err => {
//             next(err);
//         });
// })

