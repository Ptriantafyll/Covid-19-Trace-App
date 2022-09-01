const express = require("express");
const router = express.Router();

const VisitsController = require("../controllers/visit");

router.get("/", VisitsController.get_all_visits);

router.post("/", VisitsController.create_visit);

module.exports = router;
