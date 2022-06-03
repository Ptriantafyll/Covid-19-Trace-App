const mongoose = require("mongoose");

// πίνακας Επίσκεψη (Visit) - mongodb
const visitSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  POI: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "POI",
    required: true,
  },
});

module.exports = mongoose.model("User", visitSchema);
