const mongoose = require("mongoose");

const POISchema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    types: {
        type: Array
    },
    coordinates: {
        type: Float64Array
    },
    rating: {
        type: Number
    },
    rating_n: {
        type: Number
    },
    populartimes: {
        type: Array
    }
})

module.exports = mongoose.model('User', POISchema);