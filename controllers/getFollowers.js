
var twitchAccount = require("../config/twitchAccountInfo.js");
var express = require('express');
var fetch = require("node-fetch");
var db = require("../models");
var request = require('request');
var handlebars = require('handlebars');
var fetch = require("node-fetch");
// // Define our constants, you will change these with your own
module.exports = function (app) {
// // Initialize Express and middlewares
// var app = express();
// app.use(session({ secret: twitchAccount.SESSION_SECRET, resave: false, saveUninitialized: false }));
// app.use(express.static('public'));
// app.use(passport.initialize());
// app.use(passport.session());
// var currentAccess;
// // Override passport profile function to get user profile from Twitch API
// OAuth2Strategy.prototype.userProfile = function (accessToken, done) {
//     currentAccess = accessToken;
//     var options = {
//         url: 'https://api.twitch.tv/kraken/user',
//         method: 'GET',
//         headers: {
//             'Client-ID': twitchAccount.TWITCH_CLIENT_ID,
//             'Accept': 'application/vnd.twitchtv.v5+json',
//             'Authorization': 'OAuth ' + accessToken
//         }
//     };

//     request(options, function (error, response, body) {
//         if (response && response.statusCode == 200) {
//             done(null, JSON.parse(body));
//         } else {
//             done(JSON.parse(body));
//         }
//     });
// }

// passport.serializeUser(function (user, done) {
//     done(null, user);
// });

// passport.deserializeUser(function (user, done) {
//     done(null, user);
// });

// passport.use('twitch', new OAuth2Strategy({
//     authorizationURL: 'https://api.twitch.tv/kraken/oauth2/authorize',
//     tokenURL: 'https://api.twitch.tv/kraken/oauth2/token',
//     clientID: twitchAccount.TWITCH_CLIENT_ID,
//     clientSecret: twitchAccount.TWITCH_SECRET,
//     callbackURL: twitchAccount.CALLBACK_URL,
//     state: true
// },
//     function (accessToken, refreshToken, profile, done) {
//         profile.accessToken = accessToken;
//         profile.refreshToken = refreshToken;

//         // Securely store user profile in your DB
//         //User.findOrCreate(..., function(err, user) {
//         //  done(err, user);
//         //});

//         done(null, profile);
//     }
// ));

// // Set route to start OAuth link, this is where you define scopes to request
// app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user_read' }));

// // Set route for OAuth redirect
// app.get('/callback', passport.authenticate('twitch', { successRedirect: '/list', failureRedirect: '/error' }));

// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array;
// }
// // Send the winner to the database
// function sendToDatabase(winner){
//     Winner.findOne({
//         where: {
//             name: winner
//         }
//     })
//     .then(function(results){
//         console.log(results)
//         if(results === null){
//             Winner.create({
//                 name:winner,
//                 timesWon: 1
//             })
//         }else{
//             Winner.update({
//                 timesWon: sequelize.literal('timesWon + 1') }, 
//                 { where: { name: winner }
//             })
//         }
//     })
// }
// // Look up winner's tagname by id
// function lookUpUserName(WINNER, res){
//     const ID = WINNER.from_id; 
//     var options = {
//         url: `https://api.twitch.tv/helix/users?id=${ID}`,
//         method: 'GET',
//         headers: {
//             'Client-ID': twitchAccount.TWITCH_CLIENT_ID,
//             'Authorization': 'Bearer ' + currentAccess
//         }
//     };
//     function winnerName(error, response, body) {
//         //Here is where we would sift through followers for prize
        
//         if (!error && response.statusCode == 200) {
//             var info = JSON.parse(body);
//             let winner = [{name:info.data[0].display_name}];
//             sendToDatabase(winner[0].name);
//             res.render("animation",{winner})
//         }
//     }
//     request(options, winnerName);
// }
// // Shuffles user and randomly picks winner
// function pickWinner(listOfFollowers, res){
//     // console.log(listOfFollowers)
//     listOfFollowers = shuffleArray(listOfFollowers);
//     const WINNER = listOfFollowers[0];
//     lookUpUserName(WINNER, res)
// }
// // Takes current authenticated user id and gets all followers based on that id
function getCurrentFollowers(id, res) {
    
    var options = {
        url: `https://api.twitch.tv/helix/users/follows?to_id=${id}`,
        method: 'GET',
        headers: {
            'Client-ID': twitchAccount.TWITCH_CLIENT_ID,
            // 'Authorization': 'Bearer ' + currentAccess
        }
    };
    function followerIds(error, response, body) {
        //Here is where we would sift through followers for prize
        listOfFollowers = [];
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body);
            info.data.map((x) => {
                listOfFollowers.push(x);
            })
            console.log(listOfFollowers)
            // pickWinner(listOfFollowers, res);
        }
    }
    request(options, followerIds);

}
app.get('/allFollowers', function (req, res) {
        url = `https://api.twitch.tv/helix/users?login=10xrules`;

    request({
        url: url,
        headers: {
            'Client-ID': twitchAccount.TWITCH_CLIENT_ID,
            // 'Authorization': 'Bearer ' + currentAccess
        }
    }, function (error, response, body) {
        // Do more stuff with 'body' here
        let info = JSON.parse(body)
        //Get id of account being authenticated and send to function to get all followers based on that id
        getCurrentFollowers(info.data[0].id, res);
        console.log(info)
    });


})
}

// // If user has an authenticated session, display it, otherwise display link to authenticate
// app.get('/twitch', function (req, res) {
//     if (req.session && req.session.passport && req.session.passport.user) {
//         res.send(template(req.session.passport.user));
//     } else {
//         res.send('<html><head><title>Twitch Auth Sample</title></head><a href="/auth/twitch"><img src="http://ttv-api.s3.amazonaws.com/assets/connect_dark.png"></a></html>');
//     }
// });


// module.exports = app;
