var orm = require("../config/orm.js");

var winners = {
    getALL: function(callback) {
        orm.getAllWinners("winners", function(response) {
            callback(response);
        })
    }
}

module.exports = winners;