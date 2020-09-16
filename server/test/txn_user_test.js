const Txn = require('../models/txn')
const User = require('../models/user')

const mongoose = require('mongoose');
var de = require('dotenv').config();

mongoose.connect(de.parsed.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>console.log("success"));
const mocking_txn_data = {
    username: "alice",
    usertype: "student",
    paymenttype: "credit",
    date: Date.now(),
}

const newTxn = new Txn(mocking_txn_data);

const mocking_user_data = {
  usertype:"student",
  'bio.email': "a@b.com",
}

const newUser = new User(mocking_user_data);

newUser
  .save()
  .then(() => {
    console.log("hello")
  })
  .catch(_ => console.log);


// newTxn
//   .save()
//   .then(() => {
//     console.log("hello")
//   })
//   .catch(_ => console.log);