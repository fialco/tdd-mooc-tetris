class MovableShape {
  row;
  col;

  constructor(row, col) {
    this.row = row;
    this.col = col;
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
    this.falling = true;
  }

  tick() {
    return;
  }

  toString() {
    let s = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.falling && row === 0 && col === 1) {
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
