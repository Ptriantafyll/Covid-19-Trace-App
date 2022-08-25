const mongoose = require("mongoose");

// πίνακας Σημείο Ενδιαφέροντος (Point of interest) - mongodb
const POISchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  types: {
    type: Array,
  },
  coordinates: {
    type: Array,
  },
  rating: {
    type: Number,
  },
  rating_n: {
    type: Number,
  },
  populartimes: {
    type: Array,
  },
});

module.exports = mongoose.model("POI", POISchema);
