const express = require("express");
const router = express.Router();

const POIController = require("../controllers/POI");

// create POI
router.post("/", POIController.create_POI);

// bulk create pois
router.post("/bulk", POIController.bulk_import);

// bulk delete pois
router.delete("/bulk/:filename", POIController.bulk_delete);

// bulk update pois
router.patch("/bulk/:filename", POIController.bulk_update);

// post types
router.get("/:poitype", POIController.get_type_of_POI);

// get all POIs
router.get("/", POIController.get_all_POIs);

module.exports = router;
