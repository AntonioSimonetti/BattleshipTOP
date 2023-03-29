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

        attackedPositions.push(`${row},${col}`);
        return [row, col]; 
      },
    };
  }

  return {
    name,
    gameboard,
    attackedPositions,
    takeTurn(row, col) {
      if (attackedPositions.includes(`${row},${col}`)) {
        return;
      }
      gameboard.receiveAttack(row, col);
      attackedPositions.push(`${row},${col}`);
      return [row, col];
    },
  };
}

module.exports = { Player };
