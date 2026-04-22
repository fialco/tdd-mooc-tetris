import { ArikaRotatingShape } from "./ArikaRotatingShape.mjs";

export class ArikaTetromino {
  #currentOrientation;
  #orientations;

  constructor(currentOrientation, orientations) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  static T_SHAPE = new ArikaTetromino(0, [
    ArikaRotatingShape.fromString(
      `....
       TTT.
       .T..
       ....`
    ),
    ArikaRotatingShape.fromString(
      `.T..
       TT..
       .T..
       ....`
    ),
    ArikaRotatingShape.fromString(
      `....
       .T..
       TTT.
       ....`
    ),
    ArikaRotatingShape.fromString(
      `.T..
       .TT.
       .T..
       ....`
    ),
  ]);

  static I_SHAPE = ArikaTetromino.fromString(
    0,
    2,
    `.....
       .....
       IIII.
       .....
       .....`
  );

  static O_SHAPE = ArikaTetromino.fromString(
    0,
    1,
    `.OO
       .OO
       ...`
  );

  static fromString(currentOrientation, orientationCount, initialShape) {
    const shape = ArikaRotatingShape.fromString(initialShape);
    const orientations = [
      shape,
      shape.rotateRight(),
      shape.rotateRight().rotateRight(),
      shape.rotateRight().rotateRight().rotateRight(),
    ].slice(0, orientationCount);
    return new ArikaTetromino(currentOrientation, orientations);
  }

  rotateRight() {
    return new ArikaTetromino(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft() {
    return new ArikaTetromino(this.#currentOrientation - 1, this.#orientations);
  }

  #shape() {
    return this.#orientations[this.#currentOrientation];
  }

  width() {
    return this.#shape().width();
  }

  height() {
    return this.#shape().height();
  }

  blockAt(row, col) {
    return this.#shape().blockAt(row, col);
  }

  toString() {
    return this.#shape().toString();
  }
}
