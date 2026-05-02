export class ShuffleBag {
  #original;
  #bag;

  constructor(items, randomFunc = Math.random) {
    this.#original = [...items];
    this.#bag = [...items];
    this.randomFunc = randomFunc;
    this.shuffle();
  }

  next() {
    if (this.itemCount == 0) {
      this.#bag = [...this.#original];
      this.shuffle();
    }
    return this.#bag.pop();
  }

  // Using Fisher-Yates shuffle algorithm based on:
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#JavaScript_implementation
  shuffle() {
    for (let i = this.#bag.length - 1; i > 0; i--) {
      const j = Math.floor(this.randomFunc() * (i + 1));
      [this.#bag[i], this.#bag[j]] = [this.#bag[j], this.#bag[i]];
    }
  }

  get itemCount() {
    return this.#bag.length;
  }

  get originalItemCount() {
    return this.#original.length;
  }
}
