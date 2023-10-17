const db = require("../models");
const Planet = db.planet;
const Op = db.Sequelize.Op;

// Create and Save a new Planet
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.composition) {
    res.status(400).send({
      message: "Content cannot be empty!"
    });
  }

  // Create a Planet
  const planet = {
    name: req.body.name,
    composition: req.body.composition,
    filename: req.file ? req.file.filename : ""
  }

  // Save Planet in the database
  Planet.create(planet).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the planet"
    })
  });
};

// Retrieve all Planets from the database.
exports.findAll = (req, res) => {
  Planet.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving all Planets"
    })
  })
};

// Find a single Planet with an id
exports.findOne = (req, res) => {

}

// Update a Planet by the id in the request
exports.update = (req, res) => {

};

// Delete a Planet with the specified id in the request
exports.delete = (req, res) => {

};
