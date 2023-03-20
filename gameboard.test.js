const { test } = require("@jest/globals");
const { Ship } = require("./ships");
const { gameboardFactory } = require("./gameboard");

test("placing a ship on the board updates the board correctly", () => {
  const { gameboardFactory } = require("./gameboard");
  const gameboard = gameboardFactory();

  gameboard.placeShip(2, 3, 3, true);

  expect(gameboard.board[3][3]).not.toBeNull();
  expect(gameboard.board[4][3]).not.toBeNull();
});

test("check empty position", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(0, 0, 3, true);

  expect(gameboard.board[3][0]).toBeNull();
});

test("correctly updates gameboard and ship hit state when receiveAttack is called", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(2, 3, 3, true);
  gameboard.receiveAttack(2, 3);

  expect(gameboard.board[3][3]).not.toBeNull();
  expect(gameboard.ships[0].hits.some((hit) => hit === true)).toBe(true);
  expect(gameboard.ships[1]).toBeUndefined();
  expect(gameboard.board[4][4]).toBeNull();
});

test("correctly updates missedShots Array", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(2, 3, 3, true);
  gameboard.receiveAttack(4, 4);

  expect(gameboard.missedShots[0]).toEqual({ col: 4, row: 4 });
});

test("Testing receiveAttack and isSunk to sunk the ship", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(2, 3, 2, true);

  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(3, 3);
  expect(gameboard.ships[0].isSunk()).toBe(true);
});

test("Testing receiveAttack and isSunk to not sunk the ship", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(2, 3, 2, true);

  gameboard.receiveAttack(2, 3);
  expect(gameboard.ships[0].isSunk()).toBe(false);
});

test("Testing isSunk and allShipSunk to false", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(2, 3, 2, true);
  gameboard.placeShip(4, 3, 2, true);

  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(3, 3);

  expect(gameboard.ships[0].isSunk()).toBe(true);
  expect(gameboard.ships[1].isSunk()).toBe(false);
  expect(gameboard.allShipSunk()).toBe(false);
});

test("Testing allShipSunk", () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(2, 3, 2, true);
  gameboard.placeShip(4, 3, 2, true);

  gameboard.receiveAttack(2, 3);
  gameboard.receiveAttack(3, 3);
  gameboard.receiveAttack(4, 3);
  gameboard.receiveAttack(5, 3);

  expect(gameboard.ships[0].isSunk()).toBe(true);
  expect(gameboard.ships[1].isSunk()).toBe(true);
  expect(gameboard.allShipSunk()).toBe(true);
});

//npm run test -- --testNamePattern "Testing receiveAttack updates isSunk"
