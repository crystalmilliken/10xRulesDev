// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connections.js");

var Winner = sequelize.define("winner", {
  name: Sequelize.STRING,
  timesWon: Sequelize.INTEGER
}, {
  timestamps: false
});

// Syncs with DB
Winner.sync();


module.exports = Winner;
