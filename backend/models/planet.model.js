module.exports = (sequelize, Sequelize) => {
  const Planet = sequelize.define("planet", {
    name: {
      type: Sequelize.STRING
    },
    composition: {
      type: Sequelize.STRING
    },
    filename: {
      type: Sequelize.STRING
    }
  });
  return Planet;
}