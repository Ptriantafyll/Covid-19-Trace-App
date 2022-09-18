const User = require("../models/user");
const Visit = require("../models/visit");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

exports.get_all_users = (req, res, next) => {
  User.find()
    .select("username _id email covid_test past_covid_tests")
    .exec()
    .then((users) => {
      const response = {
        count: users.length,
        users: users.map((user) => {
          return {
            username: user.username,
            email: user.email,
            _id: user._id,
            tests_count: user.past_covid_tests.length + 1,
            covid_test: user.covid_test,
            past_covid_tests: user.past_covid_tests,
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

exports.get_user = (req, res, next) => {
  const userid = req.params.userid;
  User.findById(userid)
    .select("username _id email covid_test past_covid_tests")
    .exec()
    .then((user) => {
      if (user) {
        res.status(200).json({
          user: user,
        });
      } else {
        res.status(404).json({
          message: "No user found with given ID",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.post_user_emailusername = (req, res, next) => {
  User.find({ username: req.body.username, email: req.body.email })
    .exec()
    .then((user) => {
      res.status(200).json({
        user: user,
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: "user doesn't exist",
      });
    });
};

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
              past_covid_tests: req.body.past_covid_tests,
            });

            // add new user to db
            new_user
              .save()
              .then(() => {
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
  User.find({ username: req.body.username })
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
            id: user[0]._id,
            token: token,
          });
        }

        // given password didn't match hased password
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

exports.update_user = (req, res, next) => {
  id = req.params.userid;
  const updateOps = {};
  var newtestdate = {};
  var oldtestdate = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;

    if (ops.propName === "covid_test") {
      if (typeof ops.value.date === String) {
        newtestdate = new Date(parseInt(ops.value.date));
      } else {
        newtestdate = new Date(ops.value.date);
      }
    }
  }

  User.findById(id)
    .select("username password covid_test past_covid_tests")
    .exec()
    .then((response) => {
      if (Object.keys(updateOps).includes("covid_test")) {
        // if the covid_test needs to be updated thens
        // push old covid test to past_tests and make the new one the covid_test field
        oldcovidetst = response.covid_test;
        past_tests = response.past_covid_tests;
        past_tests.push(oldcovidetst);
        updateOps["past_covid_tests"] = past_tests;

        oldtestdate = new Date(oldcovidetst.date);
        const oldtestresult = oldcovidetst.result;

        var difference = Math.abs(
          newtestdate.getTime() - oldtestdate.getTime()
        );
        const hoursDifference = Math.floor(difference / 1000 / 60 / 60);

        // 336 hours = 14 days
        if (oldtestresult && hoursDifference < 336) {
          // if the user has submitted another positive test 14 days before or earlier
          return res.status(200).json({
            message:
              "You cannot submit another test until 14 days have passed after you submitted a positive test",
          });
        }

        const testtime = newtestdate.getTime();
        const mintime = testtime - 604800000; // a week before
        const maxtime = testtime + 2 * 604800000; // 2 weeks after

        if (updateOps["covid_test"].result) {
          // if user is a covid -> case update his visits a week before and 2 weeks after
          Visit.find({
            user: response.username,
            covid_case: false,
          }).then((myres) => {
            const bulkupdate = myres.map((visit) => {
              return {
                updateOne: {
                  filter: {
                    _id: visit._id,
                  },
                  update: {
                    $set: {
                      covid_case:
                        visit.time > mintime && visit.time < maxtime
                          ? true
                          : false,
                    },
                  },
                  upsert: true,
                },
              };
            });

            Visit.bulkWrite(bulkupdate, (err, docs) => {
              if (err) {
                console.log(err);
              }
            });
          });
        }
      }

      if (Object.keys(updateOps).includes("password")) {
        // check if password matches the requirements
        const pw_requirements =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!pw_requirements.test(updateOps.password)) {
          return res.status(400).json({
            message:
              "Password needs to be at least 8 characters with 1 lowercase and 1 upercase letter, 1 digit and 1 special character",
          });
        }

        // make a new hased password
        bcrypt.hash(updateOps.password, 10, (err, hash) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              error: err,
            });
          } else {
            updateOps.password = hash;
            User.updateOne({ _id: id }, { $set: updateOps })
              .exec()
              .then(() => {
                return res.status(200).json({
                  message: "Updated user successfully",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      } else {
        // update the user
        User.updateOne({ _id: id }, { $set: updateOps })
          .exec()
          .then(() => {
            res.status(200).json({
              message: "Updated user successfully",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    });
};

exports.bulk_insert = (req, res, next) => {
  const users = req.body.users;
  const users_to_insert = [];
  const pw_requirements =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const flag = false;

  for (const user of users) {
    if (!pw_requirements.test(user.password)) {
      return res.status(400).json({
        message:
          "Password needs to be at least 8 characters with 1 lowercase and 1 upercase letter, 1 digit and 1 special character",
      });
    }

    // salt = 10 - adds random strings to hashed password
    bcrypt.hash(user.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).json({
          error: err,
        });
      } else {
        const new_user = new User({
          _id: new mongoose.Types.ObjectId(),
          username: user.username,
          password: hash,
          email: user.email,
        });

        users_to_insert.push(new_user);
        if (users_to_insert.length === users.length) {
          User.collection.insertMany(users_to_insert, (err, docs) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                error: err,
              });
            } else {
              res.status(201).json({
                message: "Users added successfully",
              });
            }
          });
        }
      }
    });
  }

  // res.status(201).json({
  //   message: "Users signed up successfully",
  // });
};

exports.delete_collection = (req, res, next) => {
  User.collection
    .drop()
    .then(() => {
      res.status(200).json({
        message: "User collection deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
