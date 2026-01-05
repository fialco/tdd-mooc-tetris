import { shapeToString } from "./shapes.mjs";

function newSquareArray(size) {
  return size;
}

export class RotatingShape {
  #shape;

  constructor(shape, row, col) {
    this.#shape = shape;
  }

  static fromString(shape) {
    return new RotatingShape(shape.replaceAll(" ", "").split("\n"));
  }

  width() {
    return this.#shape[0].length;
  }

  height() {
    return this.#shape.length;
  }

  blockAt(row, col) {
    return this.#shape[row][col];
  }

  rotateRight() {
    const size = this.#shape.length;
    return newSquareArray(size);
  }

  toString() {
    return shapeToString(this);
  }
}
