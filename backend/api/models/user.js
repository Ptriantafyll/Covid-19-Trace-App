const mongoose = require("mongoose");

// πίνακας Χρήστης (User) - mongodb
const userSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    covid_test: {
        type: Date,
        result: Boolean
    }
})

module.exports = mongoose.model('User', userSchema);