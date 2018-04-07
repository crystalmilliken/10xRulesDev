var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 8080;

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var winnerRoutes = require("./controllers/getWinners.js");
var followerRoutes = require("./controllers/getFollowers.js");
var viewerRoutes = require("./controllers/viewerController.js");
app.use(winnerRoutes);
app.use(followerRoutes);
app.use(viewerRoutes);

app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });