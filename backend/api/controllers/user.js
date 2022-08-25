const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.get_all_users = (req, res, next) => {
  User.find()
    .select("username _id email covid_test")
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
        users: users.map((user) => {
          return {
            username: user.username,
            email: user.email,
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
  User.find({ username: req.body.username })
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
        if (!pw_requirements.test(req.body.password)) {
          return res.status(400).json({
            message:
              "Password needs to be at least 8 characters with 1 lowercase and 1 upercase letter, 1 digit and 1 special character",
          });
        }

        // salt = 10 - adds random strings to hashed password
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
              email: req.body.email,
              password: hash,
              covid_test: req.body.covid_test,
            });

            // add new user to db
            new_user
              .save()
              .then((/*result*/) => {
                res.status(201).json({
                  message: "User signed up successfully",
                });
              })
              .catch((err) => {
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
    .then((user) => {
      if (user.length < 1) {
        // if username doesn't exist
        return res.status(401).json({
          message: "Authorization failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Authorization failed",
          });
        }

        // given password matches hashed password
        if (result) {
          const token = jwt.sign(
            {
              username: user[0].username,
              _id: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).json({
            message: "Authorization successful",
            token: token,
          });
        }

        // if we reach this place given password didn't match hased password
        res.status(401).json({
          message: "Authorization failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
