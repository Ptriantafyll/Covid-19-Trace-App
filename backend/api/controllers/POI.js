const POI = require("../models/POI");
// const specific = require("../specific.json");
// const starting = require("../starting_pois.json");

exports.get_all_POIs = (req, res, next) => {
  POI.find()
    .select(
      "id name address types coordinates rating rating_n current_popularity populartimes time_spent"
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
            current_popularity: POI.current_popularity,
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
      "id name address types coordinates rating rating_n current_popularity populartimes time_spent"
    )
    .exec()
    .then((POIs) => {
      for (const poi in POIs) {
        // console.log(POIs[poi].types);

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
    current_popularity: req.body.current_popularity,
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

exports.bulk_import = (req, res, next) => {
  const given_file = req.body.filename;
  console.log(req.body);
  console.log("../" + given_file);

  const poisfile = require("../" + given_file);
  console.log(poisfile.length);

  POI.collection.insertMany(poisfile, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(409).json({
        message: "there pois you are trying to add already exist",
      });
    } else {
      console.log(docs);
      res.status(201).json({
        message: "multiple pois added successfully",
      });
    }
  });
};

exports.bulk_delete = (req, res, next) => {
  const given_file = req.params.filename;
  const ids_to_delete = [];

  const poisfile = require("../" + given_file);

  for (const poi in poisfile) {
    ids_to_delete.push(poisfile[poi].id);
  }
  console.log(ids_to_delete);

  POI.collection.deleteMany({ id: { $in: ids_to_delete } }, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      console.log(docs);
      res.status(200).json({
        message: "multiple pois deleted successfully",
      });
    }
  });
};

exports.bulk_update = (req, res, next) => {
  const given_file = req.params.filename;
  const ids_to_update = [];

  const poisfile = require("../" + given_file);

  for (const poi in poisfile) {
    ids_to_update.push(poisfile[poi].id);
  }
  console.log(ids_to_update);
  // console.log(Object.getOwnPropertyNames(poisfile[0]));

  const new_array = poisfile.map((poi) => {
    return {
      updateOne: {
        filter: {
          id: poi.id,
        },
        update: {
          $set: {
            id: poi.id,
            name: poi.name,
            address: poi.address,
            types: poi.types,
            coordinates: poi.coordinates,
            rating: poi.rating,
            rating_n: poi.rating_n,
            current_popularity: poi.current_popularity,
            populartimes: poi.populartimes,
            time_spent: poi.time_spent,
          },
        },
        upsert: true,
      },
    };
  });

  console.log(new_array);

  // const i = 0;
  // POI.collection.updateMany(
  //   { id: { $in: ids_to_update } },
  //   { $set: poisfile[i++] },
  //   (err, docs) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).json({
  //         error: err,
  //       });
  //     } else {
  //       console.log(docs);
  //       res.status(202).json({
  //         message: "multiple pois updated successfully",
  //       });
  //     }
  //   }
  // );

  POI.bulkWrite(new_array, (err, docs) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    } else {
      console.log(docs);
      res.status(200).json({
        message: "multiple pois updated successfully",
      });
    }
  });
};
