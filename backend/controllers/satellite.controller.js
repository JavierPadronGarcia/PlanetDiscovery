const db = require("../models");
const Satellite = db.satellite;
const Op = db.Sequelize.Op;
const fs = require('fs');
const path = require('path');

//Create a satellite and save it in the planet
exports.create = (req, res) => {

  const planetId = req.params.id;

  const satellite = {
    name: req.body.name,
    composition: req.body.composition,
    filename: req.file ? req.file.filename : "",
    planet_id: planetId
  }

  // Save Planet in the database
  Satellite.create(satellite).then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the satellite"
    })
  });
}

//Find all the satellites
exports.findAll = (req, res) => {
  Satellite.findAll().then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message: err.message || "Some error ocured while retrieving all Satellites"
    })
  })
}

//Find all the satellites in one planet
exports.findByPlanet = (req, res) => {

  const planetId = req.params.id;

  Satellite.findAll({ where: { planet_id: planetId } }).then(satellites => {
    res.send(satellites)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "There was an error finding the satellites"
    })
  })
}

//Retreive one satellite
exports.findOne = (req, res) => {

  const id = req.params.id;

  Satellite.findOne({ where: { id: id } }).then(satellite => {
    res.send(satellite)
  }).catch(err => {
    res.status(500).send({
      message: err.message || "There was an error finding the satellite"
    })
  })
}

//Update a satellite updating the image
exports.updateWithImage = (req, res) => {
  const id = req.params.id;
  const newImageData = req.file;
  const updatedSatelliteData = req.body;

  Satellite.findOne({ where: { id: id } }).then(satellite => {
    if (newImageData) {
      const previousImage = satellite.filename;

      if (previousImage) {
        const previousImagePath = path.join(__dirname, '../public/images', previousImage)
        deleteImage(previousImagePath, 'previous', res);
      }
      satellite.filename = newImageData.filename;
    }

    satellite.name = updatedSatelliteData.name || satellite.name;
    satellite.composition = updatedSatelliteData.composition || satellite.composition;
    satellite.planet_id = req.body.planet_id;

    return satellite.save();
  }).then(() => {
    res.send({ message: "Satellite was updated successfully" });
  }).catch(err => {
    res.status(500).send({ message: "Error updating the satellite, details: " + err });
  });
}

//Update a satellite except the image
exports.updateWithoutImage = (req, res) => {
  const id = req.params.id;
  const updatedSatelliteData = req.body;

  console.log(req.body)

  Satellite.findOne({ where: { id: id } }).then(satellite => {
    satellite.name = updatedSatelliteData.name || satellite.name;
    satellite.composition = updatedSatelliteData.composition || satellite.composition;
    satellite.planet_id = updatedSatelliteData.planet_id || satellite.planet_id;
    return satellite.save();
  }).then(() => {
    res.send({ message: "Satellite was updated sucesfuly" });
  }).catch(err => {
    res.status(500).send({ message: "Error updating the satellite, details: " + err })
  })
}

//Delete a satellite
exports.delete = (req, res) => {
  const id = req.params.id;

  Satellite.findOne({ where: { id: id } }).then(satellite => {

    const filename = satellite.filename;

    Satellite.destroy({ where: { id: id } }).then(num => {
      if (num == 1) {
        if (filename) {
          const imagePath = path.join(__dirname, '../public/images', filename)
          deleteImage(imagePath, 'satellite', res);
        }
        res.send({ message: "Satellite was deleted succesfully!" })
      } else {
        res.send({ message: "Cannot delete the Satellite" })
      }
    }).catch(err => {
      res.status(500).send({
        message: "Could not delete the Satellite. Error details: " + err
      })
    })
  })
}

deleteImage = (imagePath, messageName, res) => {
  fs.unlink(imagePath, err => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the " + messageName + " image. Error details: " + err
      })
    }
  })
}