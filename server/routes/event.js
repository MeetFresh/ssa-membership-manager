var express = require('express');
var router = express.Router();
const { matchedData } = require('express-validator/filter');
const EventData = require('../models/event.js');
const multiparty = require('multiparty');

router.get('/all', function(req, res, next) {
  EventData.find({})
    .then(events => {
      res.status(200).json({
        events
      });
    })
    .catch(next);
});

router.post('/', async (req, res, next) => {
    const newEvent = new EventData()
    newEvent.save()
    .then(event => {
      console.log(event)
      res.status(200).json(event)
    }).catch(err => {
      next(err);
    });
})

router.post('/del', async (req, res, next) => {
    EventData.findOneAndDelete({ _id: req.body["_id"] })
    .then(event => {
        const success = event !== null
        res.status(200).json({success})
    }).catch(err => {
        next(err)
    })
})

router.put('/', (req, res, next) => {
    EventData.findOneAndUpdate({"_id": req.body["_id"]}, req.body, {
        new: true,
        useFindAndModify: false
    }).then(event => {
        const success = event !== null
        res.status(200).json({success})
    }).catch(err => {
        next(err);
    });
})

module.exports = router;