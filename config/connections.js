var Sequelize = require("sequelize");

var sequelize = new Sequelize("twitchWinners", "root", "root", {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  
  // Exports the connection for other files to use
  module.exports = sequelize;