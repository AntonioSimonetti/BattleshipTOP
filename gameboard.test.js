const { test } = require('@jest/globals');
const { Ship } = require("./ships");
const { gameboardFactory } = require('./gameboard');

test("placing a ship on the board updates the board correctly", () => {
  const { gameboardFactory } = require("./gameboard");
  const gameboard = gameboardFactory();

  gameboard.placeShip(2, 3, 3, true);

  expect(gameboard.board[3][3]).not.toBeNull();
  expect(gameboard.board[4][3]).not.toBeNull();
});

test('check empty position', () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(0, 0, 3, true);

  expect(gameboard.board[3][0]).toBeNull();
});

test('returns false if ship cannot be placed in position', () => {
  const gameboard = gameboardFactory();
  gameboard.placeShip(9, 9, 2, true);
  expect(gameboard.placeShip(9, 9, 2, true)).toBe(false);
});