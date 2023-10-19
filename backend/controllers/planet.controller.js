const db = require("../models");
const Planet = db.planet;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path')

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

  const id = req.params.id

  Planet.findOne({ where: { id: id } }).then(planet => {
    res.send(planet)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "There was an error finding the planet"
    })
  })
}

// Update a Planet by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  const newImageData = req.file;
  const updatedPlanetData = req.body

  Planet.findOne({ where: { id: id } }).then(planet => {
    if (newImageData) {
      const previousImage = planet.filename;

      if (previousImage) {
        const previousImagePath = path.join(__dirname, '../public/images', previousImage)

        fs.unlink(previousImagePath, err => {
          if (err) {
            res.status(500).send({ message: "There was an error deleting the previous image" })
          }
        })
      }
      planet.filename = newImageData.filename;
    }

    planet.name = updatedPlanetData.name || planet.name;
    planet.composition = updatedPlanetData.composition || planet.composition;

    return planet.save();
  }).then(() => {
    res.send({ message: "Planet was updated successfully" });
  }).catch(err => {
    res.status(500).send({ message: "Error updating the planet, details: " + err });
  });

};

// Delete a Planet and its image with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Planet.findOne({ where: { id: id } }).then(planet => {

    const filename = planet.filename;

    Planet.destroy({ where: { id: id } }).then(num => {
      if (num == 1) {
        if (filename) {
          const imagePath = path.join(__dirname, '../public/images', filename)
          fs.unlink(imagePath, err => {
            if (err) {
              res.status(500).send({
                message: "Could not delete the planet image. Error details: " + err
              })
            }
          });
        }
        res.send({ message: "Planet was deleted succesfully!" })
      } else {
        res.send({ message: "Cannot delete the Planet" })
      }
    }).catch(err => {
      res.status(500).send({
        message: "Could not delete the Planet. Error details: " + err
      })
    })
  })
};