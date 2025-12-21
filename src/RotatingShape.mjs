import { shapeToString } from "./shapes.mjs";

export class RotatingShape {
  #shape;

  constructor(shape, row, col) {
    this.shape = shape;
  }

  static fromString(shape) {
    return shape.replaceAll(" ", "") + "\n";
  }

  toString() {
    return shapeToString(this);
  }
}
