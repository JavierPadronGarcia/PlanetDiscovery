module.exports = (sequelize, Sequelize) => {
  const Satellite = sequelize.define("satellite", {
    name: {
      type: Sequelize.STRING
    },
    composition: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
    },
    planet_id: {
      type: Sequelize.INTEGER
    }
  });
  return Satellite;
}