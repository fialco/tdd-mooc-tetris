export class ShuffleBag {
  #original;
  #bag;

  constructor(items) {
    this.#original = [...items];
    this.#bag = [...items];
  }

  next() {
    if (this.itemCount == 0) {
      this.#bag = [...this.#original];
    }
    return this.#bag.pop();
  }

  get itemCount() {
    return this.#bag.length;
  }

  get originalItemCount() {
    return this.#original.length;
  }
}
