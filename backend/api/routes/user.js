const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/user");

// get all users
router.get("/", UsersController.get_all_users);

// get a user
router.get("/:userid", UsersController.get_user);

// get a user from username and email
router.post("/emailusername", UsersController.post_user_emailusername);

// create user
router.post("/signup", UsersController.create_user);

// user login
router.post("/login", UsersController.user_login);

// update user
router.patch("/:userid", UsersController.update_user);

// bulk add users
router.post("/bulk", UsersController.bulk_insert);

// delete all users
router.delete("/", UsersController.delete_collection);

module.exports = router;
