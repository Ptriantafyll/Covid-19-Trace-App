const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/user");
const User = require("../models/user");

// get all users
router.get('/', UsersController.get_all_users);

// create user
// todo: /signup
router.post('/', UsersController.create_user);




module.exports = router;