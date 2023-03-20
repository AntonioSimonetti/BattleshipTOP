const { Ship } = require("./ships");
const { gameboardFactory } = require("./gameboard");
const { Player } = require("./players");

function gameloop() {
  // Create two players
  const playerOne = Player("Player One", false);
  const playerTwo = Player("Player Two", true);

  // Create two game boards //probably i dont need this, i should use the one inside playerOne and playerTwo
  const gameboardOne = gameboardFactory();
  const gameboardTwo = gameboardFactory();

  /* Player One places ships
  console.log(`It's ${playerOne.name}'s turn to place ships.`);
  for (let i = 0; i < 1; i++) {
    console.log(`Place your ship with length ${i + 1}`);
    let [row, col] = getPlayerInput();
    let orientation = prompt("Enter orientation (horizontal/vertical):");
    let isVertical = null;
    if (orientation === "horizontal") {
      isVertical = false;
    } else {
      isVertical = true;
    }
    gameboardOne.placeShip(row, col, i + 1, isVertical);
  }*/

  let i = 0;
  function playerOnePlacing() {
    // Player One places ship
    console.log(`It's ${playerOne.name}'s turn to place ships.`);
    let i = 0;
    console.log(`Place your ship with length ${i + 1}`);
    let [row, col] = getPlayerInput();
    let orientation = prompt("Enter orientation (horizontal/vertical):");
    let isVertical = null;
    if (orientation === "horizontal") {
      isVertical = false;
    } else {
      isVertical = true;
    }
    gameboardOne.placeShip(row, col, i + 1, isVertical);
    i++;
    console.log(row, col);
    console.log("piazzato");
  }

  // Player Two places ships randomly
  console.log(`It's ${playerTwo.name}'s turn to place ships.`);
  for (let i = 0; i < 1; i++) {
    let length = i + 1;
    let orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
    let isVertical = null;
    if (orientation === "horizontal") {
      isVertical = false;
    } else {
      isVertical = true;
    }
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (
      !gameboardTwo.isValidPosition(
        gameboardTwo.board,
        row,
        col,
        length,
        isVertical
      )
    );
    gameboardTwo.placeShip(row, col, length, isVertical);
  }

  // Start game loop

  let winner = null;

  function getPlayerInput(row, col) {
    console.log("dentro getplayerinput");
    console.log(row, col);
    return [row, col];
  }

  while (!gameboardTwo.allShipSunk() && !gameboardOne.allShipSunk()) {
    // Player One's turn
    //console.log(`It's ${playerOne.name}'s turn.`);
    let [row, col] = getPlayerInput();
    //console.log([row, col] + "  this is playerOne let ROW COL");
    gameboardTwo.receiveAttack(row, col);

    // Check if playerOne has won, and end the game if they have
    if (gameboardTwo.allShipSunk()) {
      // End game and display winner
      //console.log(`${playerOne.name} has won the game!`);
      winner = playerOne.name;
      break;
    }

    // Player Two's turn
    //console.log(`It's ${playerTwo.name}'s turn.`);
    [row, col] = playerTwo.takeTurn();
    gameboardOne.receiveAttack(row, col);

    // Check if playerTwo has won, and end the game if they have
    if (gameboardOne.allShipSunk()) {
      // End game and display winner
      //console.log(`${playerTwo.name} has won the game!`);
      winner = playerTwo.name;
      break;
    }
  }

  //console.log(winner);

  return {
    playerOne,
    playerTwo,
    gameboardOne,
    gameboardTwo,
    winner,
    getPlayerInput,
    playerOnePlacing,
  };
}

module.exports = { gameloop };
