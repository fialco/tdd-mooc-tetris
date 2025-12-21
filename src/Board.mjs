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
    this.#falling = new MovableShape(piece, 0, 1);
  }

  tick() {
    const attempt = this.#falling.moveDown();

    if (attempt.row >= this.#height || this.#immobile[attempt.row][attempt.col] !== EMPTY) {
      this.#immobile[this.#falling.row][this.#falling.col] = this.#falling.shape;
      this.#falling = null;
    } else {
      this.#falling = attempt;
    }
  }

  hasFalling() {
    return this.#falling !== null;
  }

  toString() {
    let s = "";
    for (let row = 0; row < this.#height; row++) {
      for (let col = 0; col < this.#width; col++) {
        if (this.#falling && row === this.#falling.row && col === this.#falling.col) {
          s += this.#falling.shape;
        } else if (this.#immobile[row][col] !== EMPTY) {
          s += this.#immobile[row][col];
        } else {
          s += ".";
        }
      }
      s += "\n";
    }
    return s;
  }
}
