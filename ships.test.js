const { test } = require("@jest/globals");
const { Ship } = require("./ships");

test("Test creating a new Ship object with a length of 3", () => {
  const myShip = Ship(3);
  expect(myShip.length).toBe(3);
});

test("Test sinking the ship", () => {
  const myShip = Ship(3);
  myShip.hit(0);
  myShip.hit(1);
  myShip.hit(2);
  expect(myShip.isSunk()).toBe(true);
});
