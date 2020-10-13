var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

require('dotenv').config()

const mongoose = require('mongoose');
//replace with Truran's api key
const stripe = require("stripe")("sk_test_51HKUBkCT0gTsZJ1O1ZC3378RpnCGkOitdo6ymQ5H5H6RTB4w7ZDA82SpV8xgufEuzv7s0M5XtN2dCwShAVPYmchE00Tbu95CAz");

const api = require('./routes');
const multiparty = require('multiparty');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const UserData = require('./models/user.js');

var app = express();
// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  {useNewUrlParser: true, useUnifiedTopology: true},
  err => {
    if (err) throw err;
    console.log('Conected to MongoDB');
  }
);

// mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(session({
  cookie: {
    path    : '/api',
    httpOnly: false,
    maxAge  : 24*60*60*1000
  },
  secret: '2C44-4D44-WppQ38S',
  resave: true,
  saveUninitialized: false
}));
app.use('/api', api);

// Render React page
// app.use(express.static(path.join(__dirname, "../client/build/")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

const calculateOrderAmount = items => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  price = 0
  for (let i = 0; i < items.length; i++) {
    price += items[i].price
  }
  return parseInt(price * 100);
};

app.post("/api/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  console.log(req.session.user);
  console.log(items);
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
    receipt_email: req.session.user
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

// app.post("./api/user/membership_update", async (req, res) => {
//   console.log('Here update');
//   const user = req.session.user;
//   const filter = {email : user};
//   const update = {membership: true, expirationdate: Date.now() + 365};
//   UserData.findOneAndUpdate(filter, update, {
//     new: true
//   })
//   .then(event => {
//     res.json({
//       event
//     });
//   })
//   .catch(err => {
//     next(err);
//   });
// })



app.post('/api/login',  (req, res) => {
  // console.log(req)
  let form = new multiparty.Form();
  form.parse(req, function(e, fields, files) {
    req.session.user = fields['email'][0];
    req.session.password = fields['password'][0];
    req.session.save();
    let filter = {email: fields['email'][0], password: fields['password'][0]};
    let status = true;
    console.log(filter);
    UserData.findOne(filter, (err, obj) => {
      if (err) {
        return res.status(500).send('Something broke!');
      }
      console.log(obj);
      if (obj === null) {
        status = false;
      }
      res.send({login: status});
    })
  })
});

app.get('/api/logout', (req, res)=>{
  req.session.destroy();
  res.send({status: true});
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));

module.exports = app;
