var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

const api = require('./routes');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

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

mongoose.Promise = global.Promise;

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

module.exports = app;
