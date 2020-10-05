var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
//replace with Truran's api key
const stripe = require("stripe")("sk_test_51HKUBkCT0gTsZJ1O1ZC3378RpnCGkOitdo6ymQ5H5H6RTB4w7ZDA82SpV8xgufEuzv7s0M5XtN2dCwShAVPYmchE00Tbu95CAz");

const api = require('./routes');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// Connect to MongoDB
// mongoose.connect(
//   process.env.MONGODB_URI,
//   {useNewUrlParser: true, useUnifiedTopology: true},
//   err => {
//     if (err) throw err;
//     console.log('Conected to MongoDB');
//   }
// );

// mongoose.Promise = global.Promise;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api', api);

// Render React page
app.use(express.static(path.join(__dirname, "../client/build/")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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

app.post("/create-payment-intent", async (req, res) => {
  const { email, items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd"
  });
  res.send({
    clientSecret: paymentIntent.client_secret
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));

module.exports = app;
