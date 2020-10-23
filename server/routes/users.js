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

router.get('/:id', (req, res, next) => {
  const username = req.params.id;
  const query = {email : username};
  UserData.findOne(filter)
    .then(user => {
      res.status(200).json({user});
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

router.put('/membership_update', async (req, res, next) =>{
  const user = req.session.user;
  // const user = "jadams@gmail.com"
  const filter = {email : user};
  let curr_registration = null;
  let curr_expiration = null;
  UserData.findOne(filter)
    .then(user => {
      curr_registration = user.registrationdate;
      curr_expiration = user.expirationdate;
      curr_usertype = user.usertype;
      curr_history = user.activityhistory;
      console.log(curr_registration);
      console.log(curr_expiration);
      let today = new Date()
      if (typeof curr_registration === "undefined" || today > curr_expiration) {
        curr_registration = today;
      }
      if (today > curr_expiration) {
        curr_expiration.setDate(today.getDate() + 365);
      } else {
        curr_expiration.setDate(curr_expiration.getDate() + 365);
      }
      curr_history.push(curr_usertype + "," + curr_registration + "," + curr_expiration);
      const update = {
        membership: true, 
        expirationdate: curr_expiration, 
        registrationdate: curr_registration,
        activityhistory: curr_history
      };
      UserData.findOneAndUpdate(filter, update, {
        new: true
      })
      .catch(err => {
        next(err);
      });
      res.json({user});
    })
    .catch(err => {
      next(err);
    });
})

router.put('/mtest', async (req, res, next) =>{
  // const user = req.session.user;
  const user = "jadams@gmail.com"
  const filter = {email : user};
  let curr_registration = null;
  let curr_expiration = null;
  UserData.findOne(filter)
    .then(user => {
      console.log(user);
      curr_registration = user.registrationdate;
      curr_expiration = user.expirationdate;
      curr_usertype = user.usertype;
      curr_history = user.activityhistory;
      console.log(curr_registration);
      console.log(curr_expiration);
      let today = new Date();
      if (typeof curr_registration === "undefined" || today > curr_expiration) {
        curr_registration = today;
      }
      if (today > curr_expiration) {
        curr_expiration.setDate(today.getDate() + 365);
      } else {
        curr_expiration.setDate(curr_expiration.getDate() + 365);
      }
      curr_history.push(curr_usertype + "," + curr_registration + "," + curr_expiration);
      const update = {
        membership: true, 
        expirationdate: curr_expiration, 
        registrationdate: curr_registration,
        activityhistory: curr_history
      };
      UserData.findOneAndUpdate(filter, update, {
        new: true
      })
      .catch(err => {
        next(err);
      });
      res.json({user});
    })
    .catch(err => {
      next(err);
    });
})



module.exports = router;
