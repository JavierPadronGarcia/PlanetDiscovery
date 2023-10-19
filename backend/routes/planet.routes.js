module.exports = app => {
  const planet = require("../controllers/planet.controller");
  var upload = require('../multer/upload');

  var router = require("express").Router();

  // Create a new Planet
  router.post("/", upload.single('file'), planet.create);
  // router.post("/", bicycles.create);

  // Retrieve all Planets
  router.get("/", planet.findAll);

  // Retrieve a single Planet with id
  router.get("/:id", planet.findOne);

  // Update a Planet with id
  router.put("/:id", planet.update);

  // Delete a Planet with id
  router.delete("/:id", planet.delete);

  app.use("/api/planets", router);
}