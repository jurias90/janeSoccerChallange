const fs = require("fs");

const path = require("path");

import { Team } from "./scoreboard";
import { Teams } from "./scoreboard";

export class Soccer {
  constructor(filename: string) {
    this.filename = filename;
  }
  private filename: string;

  runChallenge(): void {
    let listTeams = new Teams();
    let results = new Array();

    let game: Array<any>;
    let team1: Team;
    let team2: Team;
    let team1Score: number;
    let team2Score: number;
    let teamsLength: number;

    fs.readFile(
      path.join(__dirname, this.filename),
      "utf8",
      (error: any, data: any) => {
        if (error) {
          console.log(error);
        } else {
          results = data.split("\n");
          for (let i = 0; i < results.length; i++) {
            game = results[i].split(",");
            team1 = new Team(game[0].substr(0, game[0].length - 2));
            team2 = new Team(game[1].substr(1, game[1].length - 3));
            team1Score = parseInt(game[0].substr(game[0].length - 1));
            team2Score = parseInt(game[1].substr(game[1].length - 1));
            listTeams.addTeam(team1);
            listTeams.addTeam(team2);
            if (team1Score > team2Score) {
              listTeams.addPointsToTeam(team1, 3);
            } else if (team1Score < team2Score) {
              listTeams.addPointsToTeam(team2, 3);
            } else if (team1Score === team2Score) {
              listTeams.addPointsToTeam(team1, 1);
              listTeams.addPointsToTeam(team2, 1);
            }
            teamsLength = listTeams.teams.length / 2;
            if (
              listTeams.getIsAllTeams() &&
              i % teamsLength === teamsLength - 1
            ) {
              console.log("Matchday ", (i - (teamsLength - 1)) / teamsLength);
              listTeams.showTopTeams();
            }
          }
        }
      }
    );
  }
}
