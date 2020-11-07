const moment = require("moment");
const express = require("express");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const sanitize = require("mongo-sanitize");
const router = express.Router();
const User = require('../models/user.js');
const md5 = require('md5');
const { Token } = require("../models/token.js");

moment().format();

const host = process.env.HOST; // FRONTEND Host
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendingEmail = "bingyaowang.nj@gmail.com";

router.post("/login/forgot", (req, res) => {
  
    req.body = sanitize(req.body);
    
    console.log(req.body)
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.status(500).send({ message: "An unexpected error occurred" });
      }
      if (!user) return res.status(404).send({ message: "No user found with this email address." });
  
      // Create a verification token
      var token = new Token({
        _userId: user._id,
        token: crypto.randomBytes(16).toString("hex"),
      });
  
      user.passwordResetToken = token.token;
      user.passwordResetExpires = moment().add(12, "hours");
  
      user.save(function (err) {
        if (err) {
          return res.status(500).send({ message: "An unexpected error occurred" });
        }
        // Save the token
        token.save(function (err) {
          if (err) {
            return res.status(500).send({ message: "An unexpected error occurred" });
          }
          // Send the mail
          console.log(user.email);
          console.log(token.token);
          const mail = {
            to: user.email,
            from: `${sendingEmail}`,
            subject: "Reset password link",
            text: "Some useless text",
            html: `<p>Please use this link to reset your password.<a href="http://${host}/login/reset/${token.token}">http://${host}/login/reset/${token.token}</a></p>`,
          };
  
          sgMail
            .send(mail)
            .then(() => {
              return res
                .status(200)
                .send({ message: `A validation email has been sent to ${user.email}` });
            })
            .catch(() => {
              return res.status(503).send({
                message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
              });
            });
        });
      });
    });
  });
  
  //  Input : reset token via params, new password via body.
  //  HTTP Success : 200 and message.
  //  HTTP Errors : 400, 404, 500, 503.
  router.post("/login/reset/:token", (req, res) => {
    // Find a matching token
    Token.findOne({ token: req.params.token }, function (err, token) {
      if (err) {
        return res.status(500).send("An unexpected error occurred");
      }
      if (!token)
        return res.status(404).send({
          message: "This token is not valid. Your token may have expired.",
        });
  
      // If we found a token, find a matching user
      User.findById(token._userId, function (err, user) {
        if (err) {
          return res.status(500).send("An unexpected error occurred");
        }
  
        if (!user)
          return res.status(404).send({ message: `We were unable to find a user for this token.` });
  
        if (user.passwordResetToken !== token.token)
          return res.status(400).send({
            message:
              "User token and your token didn't match. You may have a more recent token in your mail list.",
          });
  
        // Verify that the user token expires date has not been passed
        if (moment().utcOffset(0) > user.passwordResetExpires) {
          return res.status(400).send({
            message:
              "You cannot reset your password. The reset token has expired. Please go through the reset form again.",
          });
        }
        // Update user
        user.password = md5(req.body.password);
        user.passwordResetToken = "";
        user.passwordResetExpires = moment().utcOffset(0);
        // Save updated user to the database
        user.save(function (err) {
            if (err) {
              return res.status(500).send({ message: "An unexpected error occurred" });
            }
            // Send mail confirming password change to the user
            const mail = {
              to: user.email,
              from: `${sendingEmail}`,
              subject: "Your password has been changed",
              text: "Some useless text",
              html: `<p>This is a confirmation that the password for your account ${user.email} has just been changed. </p>`,
            };
            sgMail.send(mail).catch(() => {
              return res.status(503).send({
                message: `Impossible to send an email to ${user.email}, try again. Our service may be down.`,
              });
            });
            return res.status(200).send({ message: "Password has been successfully changed." });
          })
      });
    });
  });

  module.exports = router;