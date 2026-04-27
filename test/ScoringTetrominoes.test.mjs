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
    board.onLineClear((lineCount) => {
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
    expect(scoring.totalLines).to.equal(0);
  });
});
