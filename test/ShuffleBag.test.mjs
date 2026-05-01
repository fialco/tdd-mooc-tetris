import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

function pullItems(bag, count) {
  for (let i = 0; i < count; i++) {
    bag.next();
  }
}

describe("Shuffle bag", () => {
  let bag;
  let items = ["I", "T", "L", "J", "T", "S", "Z", "O"];

  beforeEach(() => {
    bag = new ShuffleBag(items);
  });

  test("can hold items", () => {
    expect(bag.itemCount).to.equal(items.length);
  });

  test("items can be pulled", () => {
    bag.next();
    expect(bag.itemCount).to.equal(items.length - 1);
    bag.next();
    expect(bag.itemCount).to.equal(items.length - 2);
  });

  test("refills after pulling all items", () => {
    pullItems(bag, 8);
    expect(bag.itemCount).to.equal(items.length - 8);
    bag.next();
    expect(bag.itemCount).to.equal(items.length - 1);
  });
});
