import { shapeToString } from "./shapes.mjs";
import { Block } from "./Block.mjs";

const EMPTY = ".";

class MovableShape {
  shape;
  row;
  col;

  constructor(shape, row, col) {
    this.shape = shape;
    this.row = row;
    this.col = col;
  }

  moveDown() {
    return new MovableShape(this.shape, this.row + 1, this.col);
  }

  blockAt(row, col) {
    if (
      row >= this.row &&
      row < this.row + this.shape.height() &&
      col >= this.col &&
      col < this.col + this.shape.width()
    ) {
      return this.shape.blockAt(row - this.row, col - this.col);
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

  drop(piece) {
    if (this.#falling) {
      throw new Error("already falling");
    }
    if (typeof piece === "string") {
      piece = new Block(piece);
    }
    this.#falling = new MovableShape(piece, 0, Math.floor((this.#width - piece.width()) / 2));
  }

  tick() {
    if (!this.hasFalling()) {
      return;
    }
    const attempt = this.#falling.moveDown();

    if (this.#hitsFloor(attempt) || this.#immobile[attempt.row][attempt.col] !== EMPTY) {
      //tää toimimaan isompien palojen kanssa kun osuu pohjalle
      this.#immobile[this.#falling.row][this.#falling.col] = attempt.blockAt(attempt.row, attempt.col);
      this.#falling = null;
    } else {
      this.#falling = attempt;
    }
  }

  #hitsFloor(falling) {
    if (falling.row >= this.#height) {
      return true;
    }
    return false;
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
