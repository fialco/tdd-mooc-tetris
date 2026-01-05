import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #currentOrientation;

  constructor(currentOrientation) {
    this.#currentOrientation = currentOrientation;
  }

  static T_SHAPE = Tetromino.fromString(`.T.
       TTT
       ...`);

  static fromString(initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    return new Tetromino(shape);
  }

  #shape() {
    return this.#currentOrientation;
  }
  toString() {
    return this.#shape().toString();
  }
}
