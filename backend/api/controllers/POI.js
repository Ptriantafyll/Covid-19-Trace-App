const POI = require("../models/POI");

exports.get_all_POIs = (req, res, next) => {
  POI.find()
    .select(
      "id name address types coordinates rating rating_n populartimes time_spent"
    )
    .exec()
    .then((POIs) => {
      const response = {
        count: POIs.length,
        POIs: POIs.map((POI) => {
          return {
            id: POI.id,
            name: POI.name,
            address: POI.address,
            types: POI.types,
            coordinates: POI.coordinates,
            rating: POI.rating,
            rating_n: POI.rating_n,
            populartimes: POI.populartimes,
            time_spent: POI.time_spent,
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

// todo: να φτιάξω την αναζήτηση από το searchbar
exports.get_type_of_POI = (req, res, next) => {
  const type = req.params.poitype;
  const pois_of_given_type = [];
  POI.find()
    .select(
      "id name address types coordinates rating rating_n populartimes time_spent"
    )
    .exec()
    .then((POIs) => {
      for (const poi in POIs) {
        console.log(POIs[poi].types);

        if (POIs[poi].types.includes(type)) {
          pois_of_given_type.push(POIs[poi]);
        }
      }

      if (pois_of_given_type.length === 0) {
        res.status(404).json({
          message: "The type you entered does not exist",
        });
      } else {
        const response = {
          count: pois_of_given_type.length,
          POIs: pois_of_given_type,
        };
        res.status(200).json(response);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.create_POI = (req, res, next) => {
  // create new POI
  const new_POI = new POI({
    id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    types: req.body.types,
    coordinates: req.body.coordinates,
    rating: req.body.rating,
    rating_n: req.body.rating_n,
    populartimes: req.body.populartimes,
    time_spent: req.body.time_spent,
  });

  // add POI to db
  new_POI
    .save()
    .then(() => {
      res.status(201).json({
        message: "POI added successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
