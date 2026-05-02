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

// random with seed: https://javascript.info/task/pseudo-random-generator
const seededRandom = (seed) => {
  return () => {
    seed = (seed * 1337) % 64278921357;
    return seed / 64278921357;
  };
};

describe("Shuffle bag", () => {
  let bag;
  let items = ["I", "T", "L", "J", "S", "Z", "O"];

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

  test("pull order can be fixed with a seed", () => {
    const firstBag = new ShuffleBag(items, seededRandom(1234));
    const secondBag = new ShuffleBag(items, seededRandom(1234));
    const firstSet = pullItems(firstBag, firstBag.originalItemCount);
    const secondSet = pullItems(secondBag, secondBag.originalItemCount);

    expect(firstSet).to.deep.equal(secondSet);
  });

  test("pull order is different with different seeds", () => {
    const firstBag = new ShuffleBag(items, seededRandom(1234));
    const secondBag = new ShuffleBag(items, seededRandom(1235));
    const firstSet = pullItems(firstBag, firstBag.originalItemCount);
    const secondSet = pullItems(secondBag, secondBag.originalItemCount);

    expect(firstSet).to.not.deep.equal(secondSet);
  });

  test("10 bag pull cycles pulls all items exactly 10 times", () => {
    const pulls = pullItems(bag, bag.originalItemCount * 10);

    let pullCounts = pulls.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {});

    for (const pull in pullCounts) {
      expect(pullCounts[pull]).to.equal(10);
    }
  });
});
