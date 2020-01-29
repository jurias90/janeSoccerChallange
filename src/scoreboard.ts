export class Team {
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

export class Teams {
  constructor() {
    this.teams = [];
    this.isAllTeams = false;
  }

  public teams: Array<Team>;
  private isAllTeams: boolean;

  addTeam(team: Team): void {
    if (this.teams.length === 0) {
      this.teams.push(team);
      return;
    }
    for (let i = 0; i < this.teams.length; i++) {
      if (this.teams[i].getName() === team.getName()) {
        this.isAllTeams = true;
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

  getIsAllTeams(): Boolean {
    return this.isAllTeams;
  }
}
