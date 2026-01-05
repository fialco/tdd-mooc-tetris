export class Tetromino {
  #shape;

  constructor(shape) {
    this.#shape = shape;
  }

  static T_SHAPE = Tetromino.fromString(`.T.
       TTT
       ...`);

  static fromString(shape) {
    return new Tetromino(shape.replaceAll(" ", "").split("\n"));
  }

  toString() {
    return this.#shape.toString().replaceAll(",", "\n") + "\n";
  }
}
