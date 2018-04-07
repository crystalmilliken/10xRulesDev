

var twitchAccount = require("../config/twitchAccountInfo.js");
var express = require('express');
var fetch = require("node-fetch");
var db = require("../models");

module.exports = function (app) {
    app.get('/drawing', function (req, res) {
        res.render("beginDrawing");
    })
    app.get('/list', function (req, res) {
        const LISTOFVIEWERS = [];
        const URL = 'https://tmi.twitch.tv/group/user/10xrules/chatters'
        fetch(URL)
            .then(response => {
                response.json().then(json => {
                    // let list  = list.join(json.chatters.moderators , json.chatters.staff, json.chatters.viewers);
                    const twitchViewers = json.chatters.viewers.concat(json.chatters.moderators)
                    
                    shuffleArray(twitchViewers);
                    lookUpTagName(twitchViewers[0], res);
                });
            })
            .catch(error => {
                console.log(error);
                res.end()
            });
    })

    function lookUpTagName(winner, res) {
        
        db.Winner.findOne({
            where: {
                name: winner
            }
        })
            .then(function (results) {
                if (results === null) {
                    db.Winner.create({
                        name: winner,
                        timesWon: 1
                    })
                } else {
                    db.Winner.update({
                        timesWon: db.sequelize.literal('timesWon + 1')
                    },
                        {
                            where: { name: winner }
                        })
                }
                displayData(winner, res);
            })
    }
    function displayData(results, res) {
        console.log(results)
        let winner = [{ name: results }];
        res.render("animation", { winner })
    }
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    function pickWinner(chatters, res) {
        // console.log(listOfFollowers)
        chatters = shuffleArray(listOfFollowers);
        const WINNER = chatters[0];
        lookUpTagName(WINNER, res)
    }
}
