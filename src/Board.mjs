import { shapeToString } from "./shapes.mjs";
import { Block } from "./Block.mjs";

const EMPTY = ".";

class Point {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }
}

class MovableShape {
  #shape;
  #row;
  #col;

  constructor(shape, row, col) {
    this.#shape = shape;
    this.#row = row;
    this.#col = col;
  }

  moveDown() {
    return new MovableShape(this.#shape, this.#row + 1, this.#col);
  }

  moveLeft() {
    return new MovableShape(this.#shape, this.#row, this.#col - 1);
  }

  moveRight() {
    return new MovableShape(this.#shape, this.#row, this.#col + 1);
  }

  rotateLeft() {
    return new MovableShape(this.#shape.rotateLeft(), this.#row, this.#col);
  }

  rotateRight() {
    return new MovableShape(this.#shape.rotateRight(), this.#row, this.#col);
  }

  nonEmptyBlocks() {
    const points = [];
    for (let row = this.#row; row < this.#row + this.#shape.height(); row++) {
      for (let col = this.#col; col < this.#col + this.#shape.width(); col++) {
        const block = this.blockAt(row, col);
        if (block !== EMPTY) {
          points.push(new Point(row, col));
        }
      }
    }
    return points;
  }

  blockAt(row, col) {
    if (
      row >= this.#row &&
      row < this.#row + this.#shape.height() &&
      col >= this.#col &&
      col < this.#col + this.#shape.width()
    ) {
      return this.#shape.blockAt(row - this.#row, col - this.#col);
    } else {
      return EMPTY;
    }
  }
}

export class Board {
  #width;
  #height;
  #falling = null;
  #immobile;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
    this.#immobile = new Array(height);
    for (let row = 0; row < height; row++) {
      this.#immobile[row] = new Array(width).fill(EMPTY);
    }
  }

  setState(setString) {
    let array = setString
      .trim()
      .split("\n")
      .map((row) => {
        return row.trim().split("");
      });

    this.#immobile = array;
  }

  drop(piece) {
    if (this.#falling) {
      throw new Error("already falling");
    }
    if (typeof piece === "string") {
      piece = new Block(piece);
    }
    this.#falling = new MovableShape(
      piece,
      -this.#firstNonEmptyRow(piece),
      Math.floor((this.#width - piece.width()) / 2)
    );
  }

  #firstNonEmptyRow(piece) {
    for (let row = 0; row < piece.height(); row++) {
      for (let col = 0; col < piece.width(); col++) {
        if (piece.blockAt(row, col) !== EMPTY) return row;
      }
    }
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();

    if (this.#isAllowedMove(attempt)) {
      this.#falling = attempt;
    } else {
      this.#stopFalling();
    }
  }

  moveDown() {
    if (!this.hasFalling()) {
      return;
    }

    const attempt = this.#falling.moveDown();

    if (this.#isAllowedMove(attempt)) {
      this.#falling = attempt;
    } else {
      this.#stopFalling();
    }
  }

  moveLeft() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveLeft();

    if (this.#isAllowedMove(attempt)) {
      this.#falling = attempt;
    }
  }

  moveRight() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveRight();

    if (this.#isAllowedMove(attempt)) {
      this.#falling = attempt;
    }
  }

  rotateLeft() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.rotateLeft();
    this.#tryRotate(attempt);
  }

  rotateRight() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.rotateRight();
    this.#tryRotate(attempt);
  }

  #tryRotate(attempt) {
    const moves = [attempt, attempt.moveLeft(), attempt.moveRight(), attempt.moveRight().moveRight()];
    for (let move of moves) {
      if (this.#isAllowedMove(move)) {
        this.#falling = move;
        return;
      }
    }
  }

  #isAllowedMove(falling) {
    return !this.#isOutside(falling) && !this.#hitsImmobile(falling);
  }

  #isOutside(falling) {
    for (const block of falling.nonEmptyBlocks()) {
      if (block.row < 0 || block.row >= this.height() || block.col < 0 || block.col >= this.width()) {
        return true;
      }
    }
    return false;
  }

  #hitsImmobile(falling) {
    for (const block of falling.nonEmptyBlocks()) {
      if (this.#immobile[block.row][block.col] !== EMPTY) {
        return true;
      }
    }
    return false;
  }

  #stopFalling() {
    for (let row = 0; row < this.height(); row++) {
      for (let col = 0; col < this.width(); col++) {
        this.#immobile[row][col] = this.blockAt(row, col);
      }
    }
    this.#falling = null;
    this.#checkLines();
  }

  #checkLines() {
    // Using naive line clear gravity
    // For example official Tetris browser game on https://play.tetris.com/ uses this
    // More on line clears: https://tetris.wiki/Line_clear

    for (let rows = 0; rows < this.#immobile.length; rows++) {
      const row = this.#immobile[rows];
      if (!row.includes(EMPTY)) {
        // Removes full line
        this.#immobile.splice(rows, 1);

        // Adds empty line on top
        this.#immobile.unshift(new Array(this.#width).fill(EMPTY));
      }
    }
  }

  hasFalling() {
    return this.#falling !== null;
  }

  width() {
    return this.#width;
  }

  height() {
    return this.#height;
  }

  blockAt(row, col) {
    if (this.#falling) {
      const block = this.#falling.blockAt(row, col);
      if (block !== EMPTY) {
        return block;
      }
    }
    return this.#immobile[row][col];
  }

  toString() {
    return shapeToString(this);
  }
}
