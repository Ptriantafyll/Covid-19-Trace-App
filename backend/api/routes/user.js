const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/user");

// get all users
router.get("/", UsersController.get_all_users);

// create user
router.post("/signup", UsersController.create_user);

// user login
router.post("/login", UsersController.user_login);

module.exports = router;
