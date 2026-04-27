import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 6; i++) {
    board.tick();
  }
}

describe("Scoring tetrominoes", () => {
  let board;
  let scoring;

  beforeEach(() => {
    board = new Board(10, 6);
    scoring = new ScoringSystem();
    board.onClearLine((lineCount) => {
      scoring.linesCleared(lineCount);
    });
  });

  test("scores 40 points for clearing one line at level 0", () => {
    board.setState(`..........
       ..........
       ..........
       ..........
       ..........
       ###....###`);

    board.drop(Tetromino.I_SHAPE);

    fallToBottom(board);

    expect(scoring.score).to.equal(40);
    expect(scoring.level).to.equal(0);
    expect(scoring.totalLines).to.equal(1);
  });

  test("scores 1200 points for clearing four lines at level 0", () => {
    board.setState(`..........
       ..........
       ####.#####
       ####.#####
       ####.#####
       ####.#####`);

    board.drop(Tetromino.I_SHAPE);

    board.tick();
    board.rotateRight();

    fallToBottom(board);

    expect(scoring.score).to.equal(1200);
    expect(scoring.level).to.equal(0);
    expect(scoring.totalLines).to.equal(4);
  });

  test("scores 3000 points for clearing three lines at level 9", () => {
    board = new Board(10, 6);
    scoring = new ScoringSystem(9);

    board.onClearLine((lineCount) => {
      scoring.linesCleared(lineCount);
    });

    board.setState(`..........
       ..........
       ..........
       ###..#####
       ####.#####
       ####.#####`);

    board.drop(Tetromino.L_SHAPE);

    board.tick();
    board.rotateRight();

    fallToBottom(board);

    expect(scoring.score).to.equal(3000);
    expect(scoring.level).to.equal(9);
    expect(scoring.totalLines).to.equal(3);
  });
});
