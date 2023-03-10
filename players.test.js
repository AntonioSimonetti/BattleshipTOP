const { gameboardFactory } = require('./gameboard');
const { Player } = require('./players');


test('gameboardFactory is imported correctly', () => {
  expect(typeof gameboardFactory).toBe('function');
});

test('Player can be created with a name', () => {
    const playerName = 'Player 1';
    const player = Player("Player 1");
    expect(player.name).toBe(playerName);
  });


  test('Test that Player factory creates a gameboard with a board size of 10', () => {
    const player = Player("Player 1");
    expect(player.gameboard.board.length).toBe(10);
  });

  test('Test that create a CPU player and access the board', () => {
    const player = Player("CPU 1", true);
    const playerName = "CPU 1";
    expect(player.gameboard.board.length).toBe(10);
    expect(player.name).toBe(playerName);
  });

  test("Player can miss a shot and multiple shots", () => {
    const player = Player("Player 1");
    player.takeTurn(0, 0); 
    expect(player.attackedPositions).toEqual([ '0,0' ]); //Check if one missed attack

    player.takeTurn(1, 1);
    expect(player.attackedPositions[1]).toBe('1,1'); //Check another missed attack

    player.takeTurn(2, 2);
    expect(player.attackedPositions).toEqual(["0,0",'1,1',"2,2"]); //Check all the missed attacks

});

  test("Testing placeShip inside player factory", () => {
      const player = Player("Player 1");
      player.gameboard.placeShip(3,3,2, true);

      expect(player.gameboard.ships.length).toBe(1);
      expect(player.gameboard.board[3][3]).not.toBeNull();

      player.gameboard.placeShip(4,4,2, true);

      expect(player.gameboard.ships.length).toBe(2);
      expect(player.gameboard.board[4][4]).not.toBeNull();
      expect(player.gameboard.board[6][6]).toBeNull();  // No ship placed here

      player.gameboard.placeShip(9, 9, 2, true);
      expect(player.gameboard.placeShip(9, 9, 2, true)).toBe(false); // Ship not placed because out of boundaries

      player.gameboard.placeShip(4,4,2, true);
      expect(player.gameboard.placeShip(4, 4, 2, true)).toBe(false); // Ship already placed in that position
  });

  test("Testing if I can properly access missedShots array from Player factory", () => {
      const player = Player("Player 1");
      
      player.takeTurn(0, 0); 
      expect(player.gameboard.missedShots.length).toBe(1);
      expect(player.gameboard.missedShots).toEqual([{"col": 0,"row": 0}]);

      player.takeTurn(1, 1); 
      expect(player.gameboard.missedShots.length).toBe(2); //Multiple missed shots
      expect(player.gameboard.missedShots).toEqual([{"col": 0,"row": 0}, {"col": 1,"row": 1}]);
  }) 

  test("Testing isSunk and allShipSunk inside Player", () => {
    const player = Player("Player 1");

    player.gameboard.placeShip(3,3,2, true);
    player.takeTurn(3,3);
    player.takeTurn(4,3);

    expect(player.gameboard.allShipSunk()).toBe(true);
  })

  test("Testing isSunk and allShipSunk inside Player", () => {
    const player = Player("Player 1");

    player.gameboard.placeShip(3,3,2, true);
    player.takeTurn(3,3);
    player.takeTurn(4,3);

    player.gameboard.placeShip(5,5,2, true)

    expect(player.gameboard.allShipSunk()).toBe(false);
  })