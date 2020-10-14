var express = require('express');
var router = express.Router();
const { matchedData } = require('express-validator/filter');
const UserData = require('../models/user.js');

// /* GET users listing. */
router.get('/', function(req, res, next) {
  UserData.find({})
    .then(users => {
      res.status(200).json({
        users
      });
    })
    .catch(next);
});

router.post('/', (req, res, next)=> {
    // res.redirect("./");
    const newUserData = req.body
    console.log(newUserData);
    const newUser = new UserData(newUserData);
    // console.log(req)
    newUser
    .save()
    .then(() => {
      res.json({
        message: 'User successfully created!'
      });
    })
    .catch(err => {
      next(err);
    });
})

router.put('/', (req, res, next) => {
  const user = req.session.user;
  const filter = req.body; // may need to change
  UserData.findOneAndUpdate(filter, update, {
    new: true
  })
  .then(event => {
    res.json({
      event
    });
  })
  .catch(err => {
    next(err);
  });
})

router.put('/update', async (req, res, next)=> {
  console.log(req.body);
  console.log('Here update');
  const user = req.session.user;
  const filter = {email : user};
  let date = new Date();
  date.setDate(date.getDate() + 365);
  const update = {membership: true, expirationdate: date};
  UserData.findOneAndUpdate(filter, update, {
    new: true
  })
  .then(event => {
    res.json({
      event
    });
  })
  .catch(err => {
    next(err);
  });
})

module.exports = router;
