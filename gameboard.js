const { Ship }  = require('./ships');


let gameboardFactory = () => {
  const boardSize = 10;
  const board = Array(boardSize)  //For now is public variable
       .fill(null)
       .map(() => Array(boardSize)
       .fill(null));
  
       const ships = [];

       const _isValidPosition = (board, row, col, size, isVertical) => {
        if (isVertical) {
          if (row + size > board.length) { //Check if exceed the board
            return false;
          }
          for (let i = row; i < row + size; i++) {  //isVertical is true so it checks if all the position from row to row  plus size are null in that column
            if (board[i][col] !== null) {
              return false;
            }
          }
        } else {
          if (col + size > board.length) {  //Check if exceed the board
            return false;
          }
          for (let j = col; j < col + size; j++) { //isVertical is false so it checks if all the position from col  to col  plus size are null in that row
            if (board[row][j] !== null) {
              return false;
            }
          }
        }
        return true;  //Position is valid and empty
      };

      const placeShip = (row, col, size, isVertical) => {
        if (_isValidPosition(board,row, col, size, isVertical)) {  //If the position is valid it create a new Ship and add it to ship array to keep track of them
          const newShip = Ship(size);
          ships.push(newShip);
          if (isVertical) {             //If isVertical is true it place the ship in a vertical consecutive way
            for (let i = row; i < row + size; i++) {
              board[i][col] = newShip;
            }
          } else {
            for (let j = col; j < col + size; j++) { //If isVertical is false it place the ship in a horizontal consecutive way
              board[row][j] = newShip;
            }
          }
          return true;
        }
        return false;
      };
       
       return { board, placeShip };
     };

module.exports = {  gameboardFactory };

//TO DO:
// 1 - funzione pubblica receiveAttack , 
// 2 - board track of missing attacks,
// 3 - public function allShipSunk,
// 4 - decidere dove mettere isVertical ed implementarlo (dentro ships.js?) e testare il posizionamento anche orizzontale
