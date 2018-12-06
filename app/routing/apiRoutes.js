// Routes
// =============================================================
const friendArr = require('../data/friends');
module.exports = function apiRoutes(app) {
    // const friends = require("../data/friends.js");

    app.get("/api/friends", function (req, res) {
        return res.json(friendArr);
    }); //get /api/friends

    app.post("/api/friends", function (req, res) {
        const match = findmatch(req.body, friendArr);

        friendArr.push(req.body);
        res.json(match);
    });
    const findmatch = (user, friendArr) => {
        let bestMatch = {};

        let differece = 0;
        friendArr.forEach((friend, friendIndex) => {
            let answerDifference = 0;
            friend.scores.forEach((scores, index) => answerDifference += Math.abs(+scores - +user.scores[index]));
            if (answerDifference < differece) {
                bestMatch = friend;
            } else if (friendIndex == 0) {
                bestMatch = friend;
            };
            differece = answerDifference;
        });
        console.log(bestMatch)
        return bestMatch;
    };

};