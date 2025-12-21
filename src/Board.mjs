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

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  drop(piece) {
    if (this.#falling) {
      throw new Error("already falling");
    }
    this.#falling = new MovableShape(piece, 0, 1);
  }

  tick() {
    const attempt = this.#falling.moveDown();

    if (attempt.row >= this.#height) {
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
        } else {
          s += ".";
        }
      }
      s += "\n";
    }
    return s;
  }
}
