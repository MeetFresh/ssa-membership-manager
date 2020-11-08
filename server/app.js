var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var md5 = require('md5');

require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
//replace with Truran's api key
const stripe = require("stripe")(
  "sk_test_51HKUBkCT0gTsZJ1O1ZC3378RpnCGkOitdo6ymQ5H5H6RTB4w7ZDA82SpV8xgufEuzv7s0M5XtN2dCwShAVPYmchE00Tbu95CAz"
);

const api = require("./routes");
const multiparty = require("multiparty");
const UserData = require("./models/user.js");

var app = express();
// Connect to MongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) throw err;
    console.log("Conected to MongoDB");
  }
);

// mongoose.Promise = global.Promise;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use(
  session({
    cookie: {
      path: "/api",
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
    secret: "2C44-4D44-WppQ38S",
    resave: true,
    saveUninitialized: false,
  })
);
app.use("/api", api);

// Render React page
app.use(express.static(path.join(__dirname, "../client/build/")));

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  price = 0;
  for (let i = 0; i < items.length; i++) {
    price += items[i].price;
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
    receipt_email: req.session.user,
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/update-profile", async (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    // console.log(fields)
    let filter = {};
    console.log(Object.keys(fields));
    /**
    Object.keys(fields).forEach((k) => {
      if (k === 'username') {
        continue;
      }
      console.log(fields[k]);
      filter[k] = fields[k][0];
    })
    */
    console.log(filter);
    res.send({});
  });
});

app.post("/api/login", (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function(e, fields, files) {
    console.log(fields);
    const username = fields.username[0]
    const password = md5(fields.password[0])
    req.session.user = username;
    req.session.password = password;
    req.session.save();
    let filter = { email: username, password: password };
    let status = true;
    console.log(filter);
    // if (username === 'wtruran@gatech.edu' && password === md5('111111')) {
    //   res.send({loginSuccess: true, isAdmin: true})
    // } else {
    //   UserData.findOne(filter, (err, obj) => {
    //     if (err) {
    //       return res.status(500).send("Something broke!");
    //     }
    //     console.log(obj);
    //     if (obj === null) {
    //       status = false;
    //     }
    //     res.send({ loginSuccess: status, isAdmin: false });
    //   });
    // }
    UserData.findOne(filter, (err, obj) => {
      if (err) {
        return res.status(500).send("Something broke!");
      }
      console.log(obj);
      if (obj === null) {
        status = false;
      }
      if (obj.isAdmin === true) {
        res.send({loginSuccess: true, isAdmin: true})
      } else {
        res.send({ loginSuccess: status, isAdmin: false });
      }
    });
  });
});

app.get("/api/logout", (req, res) => {
  req.session.destroy();
  res.send({ status: true });
});

// this should be at the very last
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));

module.exports = app;
