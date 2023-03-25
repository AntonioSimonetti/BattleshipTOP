const { Ship } = require("./ships");

let gameboardFactory = () => {
  const boardSize = 10;
  const board = Array(boardSize) //For now is public variable
    .fill(null)
    .map(() => Array(boardSize).fill(null));

  const ships = [];

  const isValidPosition = (board, row, col, size, isVertical) => {
    console.log("isValidPosition called with", { row, col, size, isVertical });

    if (isVertical) {
      if (row + size > board.length) {
        console.log("exceeded board size vertically");
        return false;
      }
      for (let i = row; i < row + size; i++) {
        if (board[i][col] !== null) {
          console.log("position already occupied", { row: i, col });
          return false;
        }
      }
    } else {
      if (col + size > board.length) {
        console.log("exceeded board size horizontally");
        return false;
      }
      for (let j = col; j < col + size; j++) {
        if (board[row][j] !== null) {
          console.log("position already occupied", { row, col: j });
          return false;
        }
      }
    }

    console.log("position is valid and empty");
    return true;
  };

  const placeShip = (row, col, size, isVertical) => {

    const newShip = Ship(size);
    ships.push(newShip);
    if (isVertical === true) {
   

      //If isVertical is true it place the ship in a vertical consecutive way
      for (let i = row; i < row + size; i++) {  
        board[i][col] = newShip;
      }
    } else {
      console.log("you are using me else")

      for (let j = col; j < col + size; j++) {
        //If isVertical is false it place the ship in a horizontal consecutive way
        board[row][j] = newShip;
      }
    }
  };

  let missedShots = [];

  function receiveAttack(row, col) {
    //this will working if I will not allow the player to attack a position already attacked
    if (board[row][col] === null) {
      console.log(board[row][col])
      missedShots.push({ row, col });
      console.log(missedShots)
      console.log("mancato");
    } else {
      console.log("preso");
      console.log("questa è la board colpita: " , board);
      console.log(board[row][col])

      for (let i = 0; i < ships.length; i++) {
        const ship = ships[i];
        if (board[row][col] === ship) {
          ship.hit();
          if (ship.isSunk()) {
          }
          break;
        }
      }
    }
  }

  function allShipSunk() {
    for (let i = 0; i < ships.length; i++) {
      if (!ships[i].isSunk()) {
        console.log("nope")
        return false;
      }
    }
    console.log("yes")
    return true;
  }

  return {
    board,
    placeShip,
    receiveAttack,
    ships,
    missedShots,
    allShipSunk,
    isValidPosition,
  };
};

module.exports = { gameboardFactory };
