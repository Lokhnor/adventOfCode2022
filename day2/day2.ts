// total score is sum of scores on each round
// 1 rock - 2 paper - 3 scissors
// +0 lose / +3 draw / +6 win

// Part 1
// A rock - B paper - C scissors
// X rock - Y paper - Z scissors

// Part 2
// A rock - B paper - C scissors
// X lose - Y draw - Z win
import os from "os";
import { readInput } from "../utils/readFile";

function bonus(move: string) {
  let points: number = 0;
  switch (move) {
    case "rock":
      points = 1;
      break;
    case "paper":
      points = 2;
      break;
    case "scissors":
      points = 3;
      break;
  }
  return points;
}

async function totalScore() {
  const data = await readInput("day2.txt").split(os.EOL);

  const move: { [key: string]: string } = {
    A: "rock",
    B: "paper",
    C: "scissors",
    X: "rock",
    Y: "paper",
    Z: "scissors",
  };

  const matchUps: { [key: string]: number } = {
    "rock rock": 3,
    "paper paper": 3,
    "scissors scissors": 3,
    "rock paper": 6,
    "rock scissors": 0,
    "paper rock": 0,
    "paper scissors": 6,
    "scissors rock": 6,
    "scissors paper": 0,
  };

  const decryptedPart1 = data.map((line) => {
    return line.replace(/[ABCXYZ]/g, (character) => move[character]);
  });

  const points1: number[] = decryptedPart1.map((round) => {
    const [player1, player2] = round.split(" ");

    return matchUps[`${player1} ${player2}`] + bonus(player2);
  });

  const decryptedFirstColumn = data.map((line) => {
    return line.replace(/[ABC]/g, (character) => move[character]);
  });

  const rock = { loses: "paper", draw: "rock", beats: "scissors" };
  const paper = { loses: "scissors", draw: "paper", beats: "rock" };
  const scissors = { loses: "rock", draw: "scissors", beats: "paper" };

  const points2: number[] = decryptedFirstColumn.map((round) => {
    let [player1, player2] = round.split(" ");

    switch (player2) {
      case "X":
        return bonus(eval(player1).beats);
      case "Y":
        return 3 + bonus(eval(player1).draw);
      case "Z":
        return 6 + bonus(eval(player1).loses);
      default:
        return 0;
    }
  });

  console.log(
    `Part 1 - Total score: ${points1.reduce((a, b) => a + b, 0)}`,
    `\nPart 2 - Total score: ${points2.reduce((a, b) => a + b, 0)}`
  );
}
totalScore();
