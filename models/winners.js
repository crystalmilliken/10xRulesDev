

module.exports = function(sequelize, DataTypes) {
    var Winner = sequelize.define("Winner", {
        name: DataTypes.STRING,
        timesWon: DataTypes.INTEGER
      }, {
        timestamps: false
      });
    return Winner;
  };
