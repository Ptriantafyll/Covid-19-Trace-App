const User = require("../models/user");
const mongoose = require("mongoose");

exports.get_all_users = (req, res, next) => {
    User.find()
    .select("username _id covid_test")
    .exec()
    .then(users => {
        // response = result
        const response = {
            count: users.length,
            users: users.map(user => {
                return {
                    username: user.username,
                    _id: user._id,
                    covid_test: user.covid_test,
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

// todo: add authorization
exports.create_user = (req, res, next) => {
    // create new user
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password,
        covid_test: req.body.covid_test
    });

    // add to db
    user.save().then(result => {
        res.status(201).json({
            message: "created user successfully",
            createdUser: {
                _id: result._id,
                username: result.username,
                password: result.password,
                covid_test: result.covid_test
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}