import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle, T shape", () => {
    board.drop(ArikaTetromino.T_SHAPE);

    expect(board.toString()).to.equalShape(
      `...TTT....
       ....T.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("start from the top middle, I shape", () => {
    board.drop(ArikaTetromino.I_SHAPE);

    expect(board.toString()).to.equalShape(
      `...IIII...
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("start from the top middle, O shape", () => {
    board.drop(ArikaTetromino.O_SHAPE);

    expect(board.toString()).to.equalShape(
      `....OO....
       ....OO....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("stop when they hit the bottom", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });

  test("stop when they land on another block", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(ArikaTetromino.T_SHAPE);
    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ...TTT....
       ....T.....`
    );
  });

  test("can be moved left", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `..TTT.....
       ...T......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved right", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `....TTT...
       .....T....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("can not move left beyond the board ", () => {
    board.drop(Tetromino.T_SHAPE);

    for (let i = 0; i < 5; i++) {
      board.moveLeft();
    }

    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can not move right beyond the board ", () => {
    board.drop(Tetromino.T_SHAPE);

    for (let i = 0; i < 6; i++) {
      board.moveRight();
    }

    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can not move down below the floor", () => {
    board.drop(Tetromino.T_SHAPE);
    expect(board.hasFalling()).to.be.true;

    for (let i = 0; i < 5; i++) {
      board.moveDown();
    }
    expect(board.hasFalling()).to.be.false;
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });

  test("can not move left through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);

    for (let i = 0; i < 4; i++) {
      board.moveLeft();
    }
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);

    for (let i = 0; i < 3; i++) {
      board.moveDown();
    }

    for (let i = 0; i < 3; i++) {
      board.moveLeft();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ...T......
       OOTTT.....
       OO........`
    );
  });

  test("can not move right through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);

    for (let i = 0; i < 3; i++) {
      board.moveRight();
    }
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);

    for (let i = 0; i < 3; i++) {
      board.moveDown();
    }

    for (let i = 0; i < 3; i++) {
      board.moveRight();
    }

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .....T....
       ....TTTOO.
       .......OO.`
    );
  });

  test("can not move down through other blocks", () => {
    board.drop(Tetromino.O_SHAPE);

    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);

    for (let i = 0; i < 4; i++) {
      board.moveDown();
    }

    expect(board.hasFalling()).to.be.false;
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....OO....
       ....OO....`
    );
  });
});
