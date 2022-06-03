const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.get_all_users = (req, res, next) => {
  User.find()
    .select("username _id covid_test")
    .exec()
    .then((users) => {
      // response = result
      const response = {
        count: users.length,
        users: users.map((user) => {
          return {
            username: user.username,
            _id: user._id,
            covid_test: user.covid_test,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

// todo: add hashing for password (and authorization?)
exports.create_user = (req, res, next) => {
  User.find({
    username: req.body.username,
  })
    .exec()
    .then((user) => {
      // check if user exists
      if (user.length >= 1) {
        return res.status(409).json({
          message: "User already exists",
        });
      } else {
        // check if password matches the requirements
        // MAYBE THIS NEEDS TO BE DONE AT THE FRONTEND - NOT SURE
        const pw_requirements =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        console.log("password of user is: " + req.body.password);
        if (pw_requirements.test(req.body.password)) {
          console.log("password correct");
        } else {
            return res.status(400).json({
                message: "Password needs to be at least 8 characters with 1 lowercase and 1 upercase letter, 1 digit and 1 special character"
            })
        }

        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            // create new user
            const new_user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
              covid_test: req.body.covid_test,
            });

            // add new user to db
            new_user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User signed up successfully",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ username: req.body.username }) //request body should have a username field
    .exec()
    .then();
};
