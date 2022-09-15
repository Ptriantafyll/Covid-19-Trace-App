const mongoose = require("mongoose");

// πίνακας Επίσκεψη (Visit) - mongodb
const visitSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: String,
    ref: "User",
    required: true,
  },
  POI: {
    type: String,
    ref: "POI",
    required: true,
  },
  POI_id: {
    type: String,
    ref: "POI",
  },
  time: {
    type: String,
    required: true,
  },
  covid_case: {
    type: Boolean,
    required: true,
  },
  peopleEstimate: {
    type: Number,
  },
});

module.exports = mongoose.model("Visit", visitSchema);
