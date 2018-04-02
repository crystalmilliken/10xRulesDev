var express = require("express");

var router = express.Router();

var winners = require("../models/winners.js");

router.get("/", function( req, res) {
    winners.getALL(function(data) {
        console.log(data)
    });
    res.end();
});
router.get("/followers", function(req, response){
    
})
module.exports = router;