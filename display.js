const { getPlayerInput } = require("./gameloop");


function createGrid() {
  const topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  document.body.appendChild(topContainer)

  const mainHeader = document.createElement("div");
  mainHeader.classList.add("main-header");
  mainHeader.setAttribute("id","mainHeader");
  mainHeader.textContent = "Click on the grid to place a ship!"
  topContainer.appendChild(mainHeader);

  // Create main container
  const mainContainer = document.createElement("div");
  mainContainer.classList.add("main-container");
  document.body.appendChild(mainContainer);

  // Create first grid container with class 'grid1-container'
  const grid1Container = document.createElement("div");
  grid1Container.classList.add("grid1-container");
  mainContainer.appendChild(grid1Container);

  // Create first grid with class 'grid1'
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gridItemOne = document.createElement("div");
      gridItemOne.classList.add("grid-item-grid1");
      gridItemOne.setAttribute("data-row", i);
      gridItemOne.setAttribute("data-col", j);
      grid1Container.appendChild(gridItemOne);

      // Add click event listener to each grid item
      gridItemOne.addEventListener("click", getPlayerInput);
    }
  }

  // Create second grid container with class 'grid2-container'
  const grid2Container = document.createElement("div");
  grid2Container.classList.add("grid2-container");
  mainContainer.appendChild(grid2Container);

  // Create second grid with class 'grid2'
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const gridItemTwo = document.createElement("div");
      gridItemTwo.classList.add("grid-item-grid2");
      gridItemTwo.setAttribute("data-row", i);
      gridItemTwo.setAttribute("data-col", j);
      grid2Container.appendChild(gridItemTwo);
    }
  }
  
  //Create the divs with player's name
  const nameDiv = document.createElement("div");
  nameDiv.classList.add("nameDiv");
  document.body.appendChild(nameDiv);
  const leftName = document.createElement("div");
  leftName.classList.add("leftName");
  const leftNameTxt = document.createElement("div");
  leftNameTxt.textContent = "Player One";
  leftName.appendChild(leftNameTxt);
  nameDiv.appendChild(leftName);
  const rightName = document.createElement("div");
  const rightNameTxt = document.createElement("div");
  rightName.classList.add("rightName");
  rightNameTxt.textContent = "Player Two";
  rightName.appendChild(rightNameTxt);
  nameDiv.appendChild(rightName);
}

module.exports = {
  createGrid: createGrid,
};

