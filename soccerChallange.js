var fs = require("fs");
var path = require("path");
var Team = /** @class */ (function () {
    function Team(name) {
        this.name = name;
        this.points = 0;
    }
    Team.prototype.addPoints = function (points) {
        this.points += points;
    };
    Team.prototype.getName = function () {
        return this.name;
    };
    Team.prototype.getPoints = function () {
        return this.points;
    };
    return Team;
}());
var Teams = /** @class */ (function () {
    function Teams() {
        this.teams = [];
        this.isAllTeams = false;
    }
    Teams.prototype.addTeam = function (team) {
        if (this.teams.length === 0) {
            this.teams.push(team);
            return;
        }
        for (var i = 0; i < this.teams.length; i++) {
            if (this.teams[i].getName() === team.getName()) {
                this.isAllTeams = true;
                return;
            }
        }
        this.teams.push(team);
    };
    Teams.prototype.addPointsToTeam = function (team, points) {
        for (var i = 0; i < this.teams.length; i++) {
            if (team.getName() === this.teams[i].getName()) {
                this.teams[i].addPoints(points);
                this.sortTopTeams();
                return;
            }
        }
    };
    Teams.prototype.sortTopTeams = function () {
        if (this.teams.length <= 1) {
            return;
        }
        var temp;
        for (var i = this.teams.length - 1; i > 0; i--) {
            for (var j = 0; j < i; j++) {
                if (this.teams[j + 1].getPoints() === this.teams[j].getPoints()) {
                    if (this.teams[j]
                        .getName()[0]
                        .localeCompare(this.teams[j + 1].getName()[0]) > 0) {
                        temp = this.teams[j + 1];
                        this.teams[j + 1] = this.teams[j];
                        this.teams[j] = temp;
                    }
                }
                if (this.teams[j + 1].getPoints() > this.teams[j].getPoints()) {
                    temp = this.teams[j + 1];
                    this.teams[j + 1] = this.teams[j];
                    this.teams[j] = temp;
                }
            }
        }
    };
    Teams.prototype.showTopTeams = function () {
        this.sortTopTeams();
        for (var i = 0; i < 3; i++) {
            console.log(this.teams[i].getName(), ": ", this.teams[i].getPoints());
        }
        console.log("\n");
    };
    Teams.prototype.getIsAllTeams = function () {
        return this.isAllTeams;
    };
    return Teams;
}());
var listTeams = new Teams();
var results = new Array();
var game;
var team1;
var team2;
var team1Score;
var team2Score;
var teamsLength;
fs.readFile(path.join(__dirname, "./sample-input.txt"), "utf8", function (error, data) {
    if (error) {
        console.log(error);
    }
    else {
        results = data.split("\n");
        for (var i = 0; i < results.length; i++) {
            game = results[i].split(",");
            team1 = new Team(game[0].substr(0, game[0].length - 2));
            team2 = new Team(game[1].substr(1, game[1].length - 3));
            team1Score = parseInt(game[0].substr(game[0].length - 1));
            team2Score = parseInt(game[1].substr(game[1].length - 1));
            listTeams.addTeam(team1);
            listTeams.addTeam(team2);
            if (team1Score > team2Score) {
                listTeams.addPointsToTeam(team1, 3);
            }
            else if (team1Score < team2Score) {
                listTeams.addPointsToTeam(team2, 3);
            }
            else if (team1Score === team2Score) {
                listTeams.addPointsToTeam(team1, 1);
                listTeams.addPointsToTeam(team2, 1);
            }
            teamsLength = listTeams.teams.length / 2;
            if (listTeams.getIsAllTeams() && i % teamsLength === teamsLength - 1) {
                console.log(i, "Matchday ", (i - (teamsLength - 1)) / teamsLength);
                listTeams.showTopTeams();
            }
        }
    }
});