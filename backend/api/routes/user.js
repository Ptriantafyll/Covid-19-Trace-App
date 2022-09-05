const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/user");

// get all users
router.get("/", UsersController.get_all_users);

// get a user
router.get("/:userid", UsersController.get_user);

// create user
router.post("/signup", UsersController.create_user);

// user login
router.post("/login", UsersController.user_login);

// update user
router.patch("/:userid", UsersController.update_user);

module.exports = router;
