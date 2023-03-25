const { gameboardFactory } = require("./gameboard");
const { Player } = require("./players");

let phases = 1;
let placements = [];
let gameboardOneArr = [];
let gameboardTwoArr = [];
let playersName = [];

function getPlayerInput(event) {
  // Get the row and column of the clicked cell
  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);
  let isVertical = confirm("Do you want to place the ship vertically?");
  
    placements.push(row,col,isVertical);
    console.log(placements)

    if (isVertical) {
      for (let i = row; i < row + phases; i++) {
        let gridItemOne = document.querySelectorAll(".grid-item-grid1");
        if (gridItemOne.length > 0) {
          gridItemOne.forEach((item) => {
            if (item.dataset.row == i && item.dataset.col == col) {
              item.style.backgroundColor = "black";
            }
          });
        }
      }
    } else { 
      console.log("col: ", col);
      console.log(typeof col);
      console.log("phases: ", phases);
      for (let j = col; j < col + phases; j++) {
        console.log("j: ", j);
        let gridItemOne = document.querySelectorAll(".grid-item-grid1");
        if (gridItemOne.length > 0) {
          gridItemOne.forEach((item) => {
            if (item.dataset.row == row && item.dataset.col == j) {
              item.style.backgroundColor = "black";
            }
          });
        }
      }
    }


    if (phases > 4) {
      //removes the eventlistener by cloning the element without the eventlistener and replacing the one that had it
      const elements = document.getElementsByClassName('grid-item-grid1');
      Array.from(elements).forEach(element => {
      const clonedElement = element.cloneNode(true);
      element.parentNode.replaceChild(clonedElement, element);
   });
      gameloop();
      return;
    }
    phases++
  }

  function turn (event) {
    let winner = null;
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);

    // Highlight the cell that is receiving the attack
    let gridItemTwo = document.querySelectorAll(".grid-item-grid2");
    if (gridItemTwo.length > 0) {
      gridItemTwo.forEach((item) => {
        if (item.dataset.row == row && item.dataset.col == col ) {
          item.classList.add("water");
        }
        
        if(item.dataset.row == row && item.dataset.col == col && gameboardTwoArr[0].board[row][col] != null) {
          item.classList.remove("water");
          item.classList.add("hitted");
        }
      });
    
    }
  

    console.log("inizio attacco player 1");
    gameboardTwoArr[0].receiveAttack(row,col);
    //console.log(gameboardTwoArr[0].missedShots);
    console.log("fine attacco  1");

    if (gameboardTwoArr[0].allShipSunk()) {
      winner = playersName[0].name;
      let winnerHeader = document.getElementById("mainHeader");
      winnerHeader.textContent = `The winner is: ${winner}`;

    } else {
      console.log("inizio attacco player 2");
      let attacks = playersName[1].takeTurn();
      console.log(attacks)
      gameboardOneArr[0].receiveAttack(attacks[0], attacks[1]);


       // Highlight the cell that is receiving the attack
    let gridItemOne = document.querySelectorAll(".grid-item-grid1");
    if (gridItemOne.length > 0) {
      gridItemOne.forEach((item) => {
        if (item.dataset.row == attacks[0] && item.dataset.col == attacks[1] ) {
          item.classList.add("water");
        }
        
        if(item.dataset.row == attacks[0] && item.dataset.col == attacks[1] && gameboardOneArr[0].board[attacks[0]][attacks[1]] != null) {
          item.classList.remove("water");
          item.classList.add("hitted");
        }
      });
    
    }




      
      console.log("fine attacco player 2");
      // Check if playerTwo has won, and end the game if they have
      if (gameboardOneArr[0].allShipSunk()) {
        winner = playersName.name[1];
        winnerHeader.textContent = `The winner is: ${winner}`;
      } else {
        console.log("fine tutto");

        return;
      }
    }
  }

function gameloop() {
  console.log("started gameloop")
  // Create two players
  const playerOne = Player("Player One", false);
  const playerTwo = Player("Player Two", true);

  // Create two game boards 
  const gameboardOne = playerOne.gameboard; //gameboardFactory();
  const gameboardTwo = playerTwo.gameboard; //gameboardFactory();

  let fasi = 0;
    // Player One places ship
    for(let i = 0; i < 5;i++) {

      console.log("dentro il loop", fasi)
      console.log(`Place your ship with length ${fasi + 1}`);
      
    
        let row = parseInt(placements[0]);
        let col = parseInt(placements[1]);
        let isVertical = placements[2];
        placements = placements.slice(3);
    
      
        gameboardOne.placeShip(row, col, fasi + 1, isVertical);
        fasi++;
        console.table(gameboardOne.board);
    }
  console.log("fuori dal loop")

  //Player Two places ships randomly
  console.log(`It's ${playerTwo.name}'s turn to place ships.`);
  for (let i = 0; i < 1; i++) {
    let length = i + 1;
    let orientation1 = Math.random() < 0.5 ? "horizontal" : "vertical";
    let isVertical1 = null;
    if (orientation1 === "horizontal") {
      isVertical1 = false;
    } else {
      isVertical1 = true;
    }
    let row1, col1;
    do {
      row1 = Math.floor(Math.random() * 10);
      col1 = Math.floor(Math.random() * 10);
    } while (
      !gameboardTwo.isValidPosition(
        gameboardTwo.board,
        row1,
        col1,
        length,
        isVertical1
      )
    );
    gameboardTwo.placeShip(row1, col1, length, isVertical1);
    
    console.table(gameboardTwo.board);
  }
      
    gameboardOneArr.push(gameboardOne);
    gameboardTwoArr.push(gameboardTwo);
    playersName.push(playerOne, playerTwo);

  return {
    playerOne,
    playerTwo,
    gameboardOne,
    gameboardTwo,
    //winner,
  };
}




module.exports = { gameloop, getPlayerInput, turn };
