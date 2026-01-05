import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #currentOrientation;
  #orientations;

  constructor(currentOrientation, orientations) {
    this.#currentOrientation = currentOrientation;
    this.#orientations = orientations;
  }

  static T_SHAPE = Tetromino.fromString(`.T.
       TTT
       ...`);

  static fromString(initialShape) {
    const shape = RotatingShape.fromString(initialShape);
    const orientations = [
      shape,
      shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateRight().rotateRight().rotateRight(),
    ];
    return new Tetromino(shape, orientations);
  }

  #shape() {
    return this.#currentOrientation;
  }
  toString() {
    return this.#shape().toString();
  }
}
