var connection = require("../config/connections.js");

var orm = {
    getAllWinners: function(table, callback){
        var queryString = "SELECT * FROM winners";
        connection.query(queryString, function(err, result){
            if(err){
                throw err;
            }
            callback(result);
            
        });
    }
}

module.exports = orm;