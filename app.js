var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var winnerRoutes = require("./controllers/getWinners.js");
var followerRoutes = require("./controllers/getFollowers.js");
require("./controllers/viewerController.js")(app);
app.use(winnerRoutes);
app.use(followerRoutes);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
