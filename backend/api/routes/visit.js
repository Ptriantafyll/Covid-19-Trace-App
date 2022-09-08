const express = require("express");
const router = express.Router();

const VisitsController = require("../controllers/visit");

router.get("/2hours/:hour", VisitsController.get_visits_of_next_2_hours);

router.get("/username/:username", VisitsController.get_visits_of_user);

router.get("/lastweek/:username", VisitsController.get_last_weeks_visits);

router.get("/", VisitsController.get_all_visits);

router.post("/:userid", VisitsController.create_visit);

router.delete("/", VisitsController.delete_collection);

module.exports = router;
