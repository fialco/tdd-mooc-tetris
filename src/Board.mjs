class MovableShape {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  moveDown() {
    return new MovableShape(this.row + 1, this.col);
  }
}

export class Board {
  width;
  height;
  falling = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  drop(piece) {
    this.falling = new MovableShape(0, 1);
  }

  tick() {
    this.falling = this.falling.moveDown();
  }

  toString() {
    let s = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.falling && row === this.falling.row && col === this.falling.col) {
          s += "X";
        } else {
          s += ".";
        }
      }
      s += "\n";
    }
    return s;
  }
}
