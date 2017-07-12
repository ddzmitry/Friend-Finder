var path = require('path');
var bodyParser = require('body-parser');


var friends = require(path.join(__dirname, '../data/friends.js'))
module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    })
    app.get('/people', function(req, res) {
        res.json(friends)
    })

    app.get('/:person', function(req, res) {
        console.log(req.params.person)
        for (friend in friends) {

            if (friends[friend].name.toLowerCase() == req.params.person.toLowerCase()) {

                console.log(friends[friend])
                res.json(friends[friend])
            }
        }
        // res.json(friends)
    })
    app.post('/people/new', function(req, res) {
        console.log('THIS IS WHAT I SEND FROM FRONT END TO THE BACK END')
        console.log(req.body)
        newApplicant = req.body
        newApplicant.scores = newApplicant.scores.map(parseFloat)
        newApplicant.total = parseInt(newApplicant.total)
        friends.push(newApplicant)


    });
};