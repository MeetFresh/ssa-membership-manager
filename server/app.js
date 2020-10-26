var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const multiparty = require("multiparty");
const mongoose = require("mongoose");
//replace with Truran's api key
const stripe = require("stripe")(
  "sk_test_51HKUBkCT0gTsZJ1O1ZC3378RpnCGkOitdo6ymQ5H5H6RTB4w7ZDA82SpV8xgufEuzv7s0M5XtN2dCwShAVPYmchE00Tbu95CAz"
);

const api = require("./routes");
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const Event = require("./models/event");
require("dotenv").config();
var app = express();
console.log(process.env.MONGODB_URI);
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
app.use("/api", api);

// Render React page
app.use(express.static(path.join(__dirname, "../client/build/")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

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

app.post("/create-payment-intent", async (req, res) => {
  const { email, items } = req.body;
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.post("/update-profile", async (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    console.log(fields);
    res.send({});
  });
});

app.post("/login", async (req, res) => {
  let form = new multiparty.Form();
  form.parse(req, function (err, fields, files) {
    const username = fields.userna·me[0];
    const password = fields.password[0];
    if (username === "wtruran@gatech.edu" && password === "111111") {
      res.send({ loginSuccess: true, isAdmin: true });
    } else {
      res.send({ loginSuccess: true, isAdmin: false });
    }
  });
});

let DATABASE_ID = 100;
app.post("/new-event", async (req, res) => {
  const newId = "event/announcement-" + DATABASE_ID;
  DATABASE_ID++;

  const newEvent = new Event({
    id: newId,
    name: "1",
    type: "1",
    desc: "1",
    longDesc: "1",
    picSrc: "1",
    learnMoreLink: "1",
  });

  await newEvent.save();

  res.send({ newId: newId });
});

app.post("/edit-event", async (req, res) => {
  const { targetItem } = req.body;
  const {
    id,
    name,
    type,
    desc,
    longDesc,
    price,
    picSrc,
    learnMoreLink,
  } = targetItem;

  await Event.updateOne(
    { id: id },
    {
      $set: {
        name,
        type,
        desc,
        longDesc,
        price,
        picSrc,
        learnMoreLink,
      },
    }
  );

  res.send({ success: true });
});

app.post("/delete-event", async (req, res) => {
  const { deleteId } = req.body;

  await Event.findOneAndDelete({ id: deleteId });

  res.send({ success: true });
});

app.listen(4242, () => console.log("Node server listening on port 4242!"));

module.exports = app;
