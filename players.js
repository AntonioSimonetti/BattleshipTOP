const { Ship } = require("./ships");
const { gameboardFactory } = require("./gameboard");

function Player(name, isComputer = false) {
  const gameboard = gameboardFactory();
  const attackedPositions = []; // Array to keep track of attacked positions by the player

  if (isComputer) {
    return {
      name,
      gameboard,
      attackedPositions,
      takeTurn() {
        let row, col;
        do {
          row = Math.floor(Math.random() * gameboard.board.length);
          col = Math.floor(Math.random() * gameboard.board.length);
        } while (attackedPositions.includes(`${row},${col}`));

        gameboard.receiveAttack(row, col);
        attackedPositions.push(`${row},${col}`);
        return [row, col]; //not sure about this yet
      },
    };
  }

  return {
    name,
    gameboard,
    attackedPositions,
    takeTurn(row, col) {
      //This do not ensure that the player cannot choose an already attacked position.Handle this in the input part of the code and maybe modify this later.
      if (attackedPositions.includes(`${row},${col}`)) {
        console.log(`Position (${row}, ${col}) has already been attacked!`);
        return;
      }
      gameboard.receiveAttack(row, col);
      attackedPositions.push(`${row},${col}`);
      return [row, col];
    },
  };
}

module.exports = { Player };
