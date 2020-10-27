var express = require('express');
var router = express.Router();
const user = require('./users.js');
const event = require('./event.js')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send("this is an API route");
// });

router.use('/user', user);
router.use('/event', event);

module.exports = router;
