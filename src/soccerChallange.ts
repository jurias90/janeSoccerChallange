import { Soccer } from "./fileReader";

let filename = "./sample-input.txt";
let name = process.argv[2];
if (name) {
  filename = name;
}

const newGame = new Soccer(filename);
newGame.runChallenge();
