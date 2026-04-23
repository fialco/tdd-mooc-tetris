import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 6; i++) {
    board.tick();
  }
}

describe("Line clear", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("clears one floor line", () => {
    board.setState(`..........
       ..........
       ..........
       ..........
       ..........
       ###....###`);

    board.drop(Tetromino.I_SHAPE);

    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  /*
  test("clears one floor line, drops remaining blocks, ", () => {
    board.setState(`..........
       ..........
       ..........
       ..........
       ..........
       ###..#####`);

    board.drop(Tetromino.S_SHAPE);

    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ....SS....`
    );
  });
*/

  // TODO: clears two lines
  // TODO: clears three lines
  // TODO: clears four lines
});
