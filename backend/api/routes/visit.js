const express = require("express");
const router = express.Router();

const VisitsController = require("../controllers/visit");

// get all visits +-2 hours from given hour
router.get("/2hours/:hour", VisitsController.get_visits_of_next_2_hours);

// get visits of user
router.get("/username/:username", VisitsController.get_visits_of_user);

// get last weeks visits of user
router.get("/lastweek/:username", VisitsController.get_last_weeks_visits);

// get all visits
router.get("/", VisitsController.get_all_visits);

// create visit
router.post("/:userid", VisitsController.create_visit);

// delete all visits
router.delete("/", VisitsController.delete_collection);

module.exports = router;
