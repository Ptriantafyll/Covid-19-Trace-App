const express = require("express");
const router = express.Router();

const POIController = require("../controllers/POI");

// create POI
router.post("/", POIController.create_POI);

// post types
router.get("/:poitype", POIController.get_type_of_POI);

// get all POIs
router.get("/", POIController.get_all_POIs);

module.exports = router;
