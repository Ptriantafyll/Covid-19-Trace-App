const Visit = require("../models/visit");
const mongoose = require("mongoose");

exports.get_all_visits = (req, res, next) => {
  Visit.find()
    .select("_id user POI time peopleEstimate")
    .exec()
    .then((visits) => {
      const response = {
        count: visits.length,
        visits: visits.map((visit) => {
          return {
            _id: visit._id,
            user: visit.user,
            POI: visit.POI,
            time: visit.time,
            peopleEstimate: visit.peopleEstimate,
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.create_visit = (req, res, next) => {
  // create new visit
  const newVisit = new Visit({
    _id: new mongoose.Types.ObjectId(),
    user: req.body.user,
    POI: req.body.POI, //ίσως χρειαστεί να τα αλλάξω στο model και να παίρνει ξέρω γω το id μόνο
    time: req.body.time,
    peopleEstimate: req.body.peopleEstimate,
  });

  // add to db
  newVisit
    .save()
    .then(() => {
      res.status(201).json({
        message: "visit added successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
