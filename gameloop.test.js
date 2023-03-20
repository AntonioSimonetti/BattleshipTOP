const { test } = require("@jest/globals");
const { Ship } = require("./ships");
const { gameboardFactory } = require("./gameboard");
const { Player } = require("./players");
const { gameloop } = require("./gameloop");

test("Right names through gameloop", () => {
  global.prompt = jest.fn(() => 2); // Return a fixed value for testing purposes

  let loop = gameloop();

  expect(loop.playerOne.name).toBe("Player One");
});

/*test("Test winner 1", () => {
  global.prompt = jest.fn(() => 2); // Return a fixed value for testing purposes

  let loop = gameloop(); //Force Player two to place 2,2 to make Player One win

  expect(loop.winner).toBe("Player One");
  expect(loop.playerOne.name).toBe("Player One");
});*/

test("Test winner 2", () => {
  global.prompt = jest.fn(() => 2); // Return a fixed value for testing purposes

  let loop = gameloop();

  expect(loop.winner).toBe("Player Two");
});
