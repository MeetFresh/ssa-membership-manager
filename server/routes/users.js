var express = require('express');
var router = express.Router();
const { matchedData } = require('express-validator/filter');
const UserData = require('../models/user.js');
const multiparty = require('multiparty');

// /* GET users listing. */
router.get('/all', function(req, res, next) {
  UserData.find({})
    .then(users => {
      res.status(200).json({
        users
      });
    })
    .catch(next);
});

router.get('/one', (req, res, next) => {
  const username = req.body;
  const query = {email : user};
  UserData.findOne(filter)
    .then(user => {
      res.status(200).json({users});
    })
    .catch(next);
})

router.post('/', (req, res, next)=> {
    // res.redirect("./");
    const newUserData = req.body
    console.log(newUserData);
    const newUser = new UserData(newUserData);
    // console.log(req)
    newUser
    .save()
    .then(() => {
      res.redirect("./");
      // res.json({
      //   message: 'User successfully created!'
      // });
    })
    .catch(err => {
      next(err);
    });
})

router.put('/', (req, res, next) => {
  let form = new multiparty.Form();
  form.parse(req, function(err, fields, files) {
    // console.log(fields)
    let filter = {}
    console.log(Object.keys(fields))
    Object.keys(fields).forEach((k) => {
      if (k === 'username') {
        return;
      }
      if (k === 'status') {
        filter.usertype = fields[k][0];
      } else {
        filter[k] = fields[k][0];
      }
    })
    console.log(filter)
    const user = req.session.user;
    const query = {email : user};
    UserData.findOneAndUpdate(query, filter, {
      new: true,
      useFindAndModify: false
    })
    .then(event => {
      res.json({
        event
      });
    })
    .catch(err => {
      next(err);
    });
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
