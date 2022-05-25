const express = require("express");
const router = express.Router();

// handling get request for all users
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling get requests"
        // TODO: να εμφανίσω user. covid_test να δω πως εμφανίζεται το date type
    })
});

module.exports = router;