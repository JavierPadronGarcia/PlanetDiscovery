module.exports = app => {
    const satellite = require("../controllers/satellite.controller");
    var upload = require('../multer/upload');

    var router = require("express").Router();

    // Create a new Satellite
    router.post("/:id", upload.single('file'), satellite.create);

    // Retrieve all Satellites
    router.get("/", satellite.findAll);

    // Retrieve a single Satellite with id
    router.get("/:id", satellite.findOne);
    
    // Retrieve all the satellites related to the given planet id
    router.get("/planet/:id", satellite.findByPlanet);

    // Update a Satellite with id
    router.put("/:id", upload.single('file'), satellite.update);

    // Delete a Satellite with id
    router.delete("/:id", satellite.delete);

    app.use("/api/satellites", router);
}