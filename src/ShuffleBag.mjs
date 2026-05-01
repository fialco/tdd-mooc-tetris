export class ShuffleBag {
  #bag;

  constructor(items) {
    this.#bag = [...items];
  }

  next() {
    return this.#bag.pop();
  }

  get itemCount() {
    return this.#bag.length;
  }
}
