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
  private swap(leftIndex: number, rightIndex: number): void {
    var temp = this.teams[leftIndex];
    this.teams[leftIndex] = this.teams[rightIndex];
    this.teams[rightIndex] = temp;
  }

  private partition(left: number, right: number) {
    var pivot = this.teams[Math.floor((right + left) / 2)].getPoints(), //middle element
      i = left, //left pointer
      j = right; //right pointer
    while (i <= j) {
      while (this.teams[i].getPoints() > pivot) {
        i++;
      }
      while (this.teams[j].getPoints() < pivot) {
        j--;
      }
      if (i <= j) {
        this.swap(i, j); //swap two elements
        i++;
        j--;
      }
    }
    return i;
  }
  sortTopTeams(left: number = 0, right: number = this.teams.length - 1): void {
    var index;
    if (this.teams.length > 1) {
      index = this.partition(left, right); //index returned from partition
      if (left < index - 1) {
        //more elements on the left side of the pivot
        this.sortTopTeams(left, index - 1);
      }
      if (index < right) {
        //more elements on the right side of the pivot
        this.sortTopTeams(index, right);
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
