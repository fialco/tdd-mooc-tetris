import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #shape;

  constructor(shape) {
    this.#shape = shape;
  }

  static T_SHAPE = Tetromino.fromString(`.T.
       TTT
       ...`);

  static fromString(initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    return new Tetromino(shape);
  }

  toString() {
    return this.#shape.toString();
  }
}
