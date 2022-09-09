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

// get pois of a type
router.get("/:poitype", POIController.get_POIs_of_type);

// get all POIs
router.get("/", POIController.get_all_POIs);

// get types of a poi
router.get("/name/:poiname", POIController.get_types_of_POI);

// delete all pois
router.delete("/", POIController.delete_collection);

module.exports = router;
