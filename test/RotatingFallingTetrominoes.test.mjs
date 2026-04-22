import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ArikaTetromino } from "../src/ArikaTetromino.mjs";

describe("Rotating falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("can be rotated left if space", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated right if space", () => {
    board.drop(ArikaTetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateRight();

    console.log(board.toString());

    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
    );
  });

  test("can not be rotated left if no space", () => {
    board.setState([
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", "#", ".", ".", "#", ".", ".", ".", "."],
      [".", ".", "#", ".", ".", "#", ".", ".", ".", "."],
      [".", ".", "#", ".", ".", "#", ".", ".", ".", "."],
      [".", ".", "#", ".", ".", "#", ".", ".", ".", "."],
    ]);

    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ..#.T#....
       ..#..#....
       ..#..#....
       ..#..#....`
    );

    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..#..#....
       ..#.T#....
       ..#TT#....
       ..#.T#....`
    );

    board.rotateLeft();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..#..#....
       ..#.T#....
       ..#TT#....
       ..#.T#....`
    );
  });

  test("can not be rotated right if no space", () => {
    board.setState([
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", "#", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", "#", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", "#", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", "#", ".", ".", "#", ".", ".", "."],
    ]);

    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ...#T.#...
       ...#..#...
       ...#..#...
       ...#..#...`
    );

    board.tick();
    board.tick();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...#..#...
       ...#T.#...
       ...#TT#...
       ...#T.#...`
    );

    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...#..#...
       ...#T.#...
       ...#TT#...
       ...#T.#...`
    );
  });

  test("can wall kick when wall on left", () => {
    board.setState([
      ["#", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      ["#", "#", ".", ".", ".", ".", ".", ".", ".", "."],
    ]);

    board.drop(Tetromino.I_SHAPE);

    board.tick();
    board.tick();
    board.tick();
    board.rotateRight();

    board.moveLeft();
    board.moveLeft();

    expect(board.toString()).to.equalShape(
      `##........
       ##I.......
       ##I.......
       ##I.......
       ##I.......
       ##........`
    );

    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `##........
       ##........
       ##........
       ##IIII....
       ##........
       ##........`
    );
  });

  test("can wall kick when wall on right", () => {
    board.setState([
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
    ]);

    board.drop(Tetromino.I_SHAPE);

    board.tick();
    board.tick();
    board.tick();

    board.rotateRight();
    board.moveRight();

    expect(board.toString()).to.equalShape(
      `......#...
       .....I#...
       .....I#...
       .....I#...
       .....I#...
       ......#...`
    );

    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `......#...
       ......#...
       ......#...
       ..IIII#...
       ......#...
       ......#...`
    );
  });
});
