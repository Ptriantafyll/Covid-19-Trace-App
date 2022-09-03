const express = require("express");
const router = express.Router();

const VisitsController = require("../controllers/visit");

router.get("/:hour", VisitsController.get_visits_of_next_2_hours);

// router.get("/:poiname", VisitsController.get_people_estimates);

router.get("/", VisitsController.get_all_visits);

router.post("/", VisitsController.create_visit);

module.exports = router;
