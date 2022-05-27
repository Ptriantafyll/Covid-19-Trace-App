const express = require("express");
const router = express.Router();

// get request (select) για την εμφάνιση όλων των χρηστών
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling get requests"
        // TODO: να εμφανίσω user.covid_test να δω πως εμφανίζεται το date type
    })
});

// post request για τη δημιουργία ενός νέου χρήστη
router.post('/signup', (req, res, next) => {
    res.status(200).json({
        message: "Handling post requests for users"
    })
});



module.exports = router;