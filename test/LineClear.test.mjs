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

  test("clears two lines", () => {
    board.setState(`..........
       ..........
       ..........
       ..........
       ####..####
       ####..####`);

    board.drop(Tetromino.O_SHAPE);

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

  test("clears three lines", () => {
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

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("clears four lines", () => {
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

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );
  });

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

  test("clears two lines, drops remaining blocks, ", () => {
    board.setState(`..........
       ..........
       #........#
       #..#.....#
       ####..####
       ####.#####`);

    board.drop(Tetromino.Z_SHAPE);
    board.tick();
    board.rotateRight();

    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       #........#
       #..#.Z...#`
    );
  });

  test("clears three lines, drops remaining blocks, ", () => {
    board.setState(`..........
       ###.......
       #.#......#
       ####..####
       ####.#####
       ####.#####`);

    board.drop(Tetromino.J_SHAPE);
    board.tick();
    board.tick();
    board.rotateLeft();
    board.rotateLeft();

    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ###.......
       #.#......#`
    );
  });

  test("clears four lines, drops remaining blocks, ", () => {
    board.setState(`.......#.#
       ###....#..
       #####.####
       #####.####
       #####.####
       #####.####`);

    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateLeft();

    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       .......#.#
       ###....#..`
    );
  });

  test("clears hurdle lines, drops remaining blocks, ", () => {
    // clearing lines with gaps in between is a hurdle
    // More on: https://tetris.wiki/Line_clear
    board.setState(`..........
       ..........
       ###......#
       ####..####
       ##.##.###.
       #####.####`);

    board.drop(Tetromino.L_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveRight();

    fallToBottom(board);

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ###......#
       ##.##L###.`
    );
  });
});
