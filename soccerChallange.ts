import { ADDRGETNETWORKPARAMS } from "dns";

const fs = require("fs");
const path = require("path");

class Team {
  constructor(name: string) {
    this.name = name;
    this.points = 0;
  }
  private name: string;
  private points: number;

  addPoints(points: number): void {
    this.points += points;
  }
  getName(): string {
    return this.name;
  }
  getPoints(): number {
    return this.points;
  }
}

class Teams {
  constructor() {
    this.teams = [];
  }
  public teams: Array<Team>;
  addTeam(team: Team): void {
    if (this.teams.length === 0) {
      this.teams.push(team);
      return;
    }
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].getName() === team.getName()) {
        return;
      }
    }
    this.teams.push(team);
  }
  addPointsToTeam(team: Team, points: number): void {
    for (let i = 0; i < this.teams.length; i++) {
      if (team.getName() === this.teams[i].getName()) {
        this.teams[i].addPoints(points);
        this.sortTopTeams();
        return;
      }
    }
  }
  sortTopTeams(): void {
    if (this.teams.length <= 1) {
      return;
    }
    let temp: Team;
    for (let i = this.teams.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (this.teams[j + 1].getPoints() === this.teams[j].getPoints()) {
          if (
            this.teams[j]
              .getName()[0]
              .localeCompare(this.teams[j + 1].getName()[0]) > 0
          ) {
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
  }
  showTopTeams(): void {
    this.sortTopTeams();
    for (let i = 0; i < 3; i++) {
      console.log(this.teams[i].getName(), ": ", this.teams[i].getPoints());
    }
    console.log("\n");
  }
}

let listTeams = new Teams();
let results = new Array();

let game: Array<any>;
let team1: Team;
let team2: Team;
let team1Score: number;
let team2Score: number;

fs.readFile(
  path.join(__dirname, "./sample-input.txt"),
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
        if (i % 3 === 2) {
          console.log("Matchday ", (i + 1) / 3);
          listTeams.showTopTeams();
        }
      }
    }
  }
);
