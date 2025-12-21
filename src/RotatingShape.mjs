import { shapeToString } from "./shapes.mjs";

export class RotatingShape {
  #shape;

  constructor(shape, row, col) {
    this.shape = shape;
  }

  static fromString(shape) {
    return shape.replaceAll(" ", "") + "\n";
  }

  width() {
    return this.#shape[0].length;
  }

  height() {
    return this.#shape.length;
  }

  toString() {
    return shapeToString(this);
  }
}
