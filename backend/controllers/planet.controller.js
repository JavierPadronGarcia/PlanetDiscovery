const db = require("../models");
const Planet = db.planet;
const Satellite = db.satellite;
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

// Update the planet with the image
exports.updateWithImage = (req, res) => {
  const id = req.params.id;
  const newImageData = req.file ? req.file : null;
  const updatedPlanetData = req.body;

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

//update a planet without updating the image
exports.updateWithoutImage = (req, res) => {
  const id = req.params.id;
  Planet.findOne({ where: { id: id } }).then(planet => {
    const updatedPlanetData = req.body;

    planet.name = updatedPlanetData.name || planet.name;
    planet.composition = updatedPlanetData.composition || planet.composition;

    return planet.save();
  }).then(() => {
    res.send({ message: "Planet was updated succesfully" });
  }).catch(err => {
    res.status(500).send({ message: "Error updating the planet, details: " + err })
  })
}

// Delete a Planet and its image with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Planet.findOne({ where: { id: id } }).then(planet => {

    const filename = planet.filename;

    //find all satellites to get all the satellite images before the delete of the planet
    Satellite.findAll({ where: { planet_id: id } }).then(satellites => {
      let satelliteFiles = [];
      for (let i = 0; i < satellites.length; i++) {
        satelliteFiles.push(satellites[i].filename)
      }

      destroyThePlanet(id, filename, satelliteFiles, res);

    }).catch(err => {
      res.status(500).send({
        message: err.message || "There was an error finding the satellites"
      })
    })
  })
};


//delete the planet
destroyThePlanet = (id, filename, satelliteFiles, res) => {

  Planet.destroy({ where: { id: id } }).then(num => {
    if (num == 1) {
      //destroy the planet image
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
      if (satelliteFiles != []) {
        deleteSatelliteImages(satelliteFiles, res);
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
}


//destroy the satellite images related to the planet
deleteSatelliteImages = (satelliteFiles, res) => {
  satelliteFiles.map(satelliteFile => {
    if (satelliteFile) {
      const satelliteImagePath = path.join(__dirname, '../public/images', satelliteFile)
      fs.unlink(satelliteImagePath, err => {
        if (err) {
          res.status(500).send({
            message: "Could not delete the satellite image. Error details: " + err
          })
        }
      })
    }
  })
}