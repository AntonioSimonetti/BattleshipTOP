const { test } = require('@jest/globals');
const { Ship }  = require('./ships');

test("Test creating a new Ship object with a length of 3", () => {
  const myShip = Ship(3);
  expect(myShip.length).toBe(3);
})

test("Test hitting a position on the ship", () => {
  const myShip = Ship(3);
  expect(myShip.hit(2)).toBe(true);
})

test("Test trying to hit an invalid position on the ship", () => {
  const myShip = Ship(3);
  expect(myShip.hit(4)).toBe(false);
})

test("Test sinking the ship", () => {
  const myShip = Ship(3);
  myShip.hit(0);
  myShip.hit(1);
  myShip.hit(2);
  expect(myShip.isSunk()).toBe(true);
})
