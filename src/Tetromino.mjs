import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  #currentOrientation;
  #orientations;

  constructor(currentOrientation, orientations) {
    this.#currentOrientation = (currentOrientation + orientations.length) % orientations.length;
    this.#orientations = orientations;
  }

  static T_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       TTT.
       .T..
       ....`
    ),
    RotatingShape.fromString(
      `.T..
       TT..
       .T..
       ....`
    ),
    RotatingShape.fromString(
      `....
       .T..
       TTT.
       ....`
    ),
    RotatingShape.fromString(
      `.T..
       .TT.
       .T..
       ....`
    ),
  ]);

  static I_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       IIII
       ....
       ....`
    ),
    RotatingShape.fromString(
      `..I.
       ..I.
       ..I.
       ..I.`
    ),
  ]);

  static O_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       .OO.
       .OO.
       ....`
    ),
  ]);

  static L_SHAPE = new Tetromino(0, [
    RotatingShape.fromString(
      `....
       LLL.
       L...
       ....`,
    ),
    RotatingShape.fromString(
      `LL..
       .L..
       .L..
       ....`,
    ),
    RotatingShape.fromString(
      `....
       ..L.
       LLL.
       ....`,
    ),
    RotatingShape.fromString(
      `.L..
       .L..
       .LL.
       ....`,
    ),
  ]);

  rotateRight() {
    return new Tetromino(this.#currentOrientation + 1, this.#orientations);
  }

  rotateLeft() {
    return new Tetromino(this.#currentOrientation - 1, this.#orientations);
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
