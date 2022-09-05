const Visit = require("../models/visit");
const mongoose = require("mongoose");
const { response } = require("express");
const visit = require("../models/visit");

exports.get_all_visits = (req, res, next) => {
  Visit.find()
    .select("_id user POI time peopleEstimate covid_case")
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
            covid_case: visit.covid_case,
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

exports.get_visits_of_user = (req, res, next) => {
  // console.log(req);
  // console.log(req.params.username);
  // 62f779d3cb1798871398312f
  const username = req.params.username;
  const visits_of_user = [];
  Visit.find()
    .select("user POI time")
    .exec()
    .then((visits) => {
      // console.log(visits);
      for (const visit in visits) {
        // console.log(visits[visit].user);
        if (visits[visit].user === username) {
          visits_of_user.push(visits[visit]);
        }
      }
      res.status(200).json({
        username: username,
        visits_of_user: visits_of_user,
      });
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
    POI: req.body.POI,
    time: req.body.time,
    covid_case: req.body.covid_case,
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

exports.get_last_weeks_visits = (req, res, next) => {
  const username = req.params.username;
  const currenttime = new Date().getTime();
  const lastweeks_visits = [];
  Visit.find()
    .select("user POI time")
    .exec()
    .then((visits) => {
      for (const visit in visits) {
        const diff = currenttime - visits[visit].time;
        if (username === "allusers") {
          if (diff < 604800000) {
            // less than a week
            lastweeks_visits.push(visits[visit]);
          }
        } else {
          if (visits[visit].user === username && diff < 604800000) {
            lastweeks_visits.push(visits[visit]);
          }
        }
      }
      res.status(200).json({
        user: username,
        count: lastweeks_visits.length,
        lastweeks_visits: lastweeks_visits,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
