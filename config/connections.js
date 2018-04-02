var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "twitchWinners"
});

connection.connect(function(err){
    if(err) {
        console.log("error connecting");
        return;
    }
});

module.exports = connection;