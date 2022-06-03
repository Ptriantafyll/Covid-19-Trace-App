const mongoose = require("mongoose");

// πίνακας Χρήστης (User) - mongodb
const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    // match:
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  },
  covid_test: {
    date: Date, //format: "YYYY-MM-DDTHH:MM:SS.SSSZ - e.g. 2020-10-25T23:15:10:300Z"
    result: Boolean,
  },
});

module.exports = mongoose.model("User", userSchema);
