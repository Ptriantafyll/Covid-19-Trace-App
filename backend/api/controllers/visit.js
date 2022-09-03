const Visit = require("../models/visit");
const mongoose = require("mongoose");
const { response } = require("express");
const visit = require("../models/visit");

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

exports.get_visits_of_next_2_hours = (req, res, next) => {
  const current_hour = parseInt(req.params.hour);
  const visits_of_the_next_2_hours = [];

  Visit.find()
    .select("user POI time peopleEstimate")
    .then((visits) => {
      for (const visit in visits) {
        const timenumber = parseInt(visits[visit].time);
        const today = new Date(timenumber);
        if (
          today.getHours() === current_hour + 1 ||
          today.getHours() === current_hour + 2
        ) {
          visits_of_the_next_2_hours.push(visits[visit]);
        }
      }
      const response = {
        count: visits_of_the_next_2_hours.length,
        visits_of_the_next_2_hours: visits_of_the_next_2_hours,
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

// exports.get_people_estimates = (req, res, next) => {
//   const poi_name = req.params.poiname;
//   const visits_of_this_poi = [];
//   Visit.find()
//     .select("_id user POI time peopleEstimate")
//     .exec()
//     .then((visits) => {
//       for (const visit in visits) {
//         if (visits[visit].POI === poi_name)
//           visits_of_this_poi.push(visits[visit]);
//       }

//       const response = {
//         count: visits_of_this_poi.length,
//         visits: visits_of_this_poi,
//       };
//       res.status(200).json(response);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// };

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
