import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { ShuffleBag } from "../src/ShuffleBag.mjs";

function pullItems(bag, count) {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(bag.next());
  }
  return items;
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
    const items = pullItems(bag, bag.itemCount);
    expect(bag.itemCount).to.equal(0);
    bag.next();
    expect(bag.itemCount).to.equal(items.length - 1);
  });

  test("pulls items in random order", () => {
    const firstSet = pullItems(bag, bag.originalItemCount);
    const secondSet = pullItems(bag, bag.originalItemCount);

    expect(firstSet).to.not.deep.equal(secondSet);
  });
});
