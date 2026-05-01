export class ShuffleBag {
  constructor(items) {
    this.bag = [...items];
  }

  next() {
    return this.bag.pop();
  }
}
