//TTT the phoenix version from the ashes of spaghetti.

// declare winner get name without another variable. create a playerFactory to reduce declared variables and simplify bits. turn off tile listeners upon win.

//Declare variables
let player1Name = ""; //It seems I can migrate the player bits into a playerFactory
let player1Mark = "";
let p1 = document.getElementById("p1");
let player2Name = "";
let player2Mark = "";
let p2 = document.getElementById("p2");
const playGameBtn = document.getElementById("playGame");
let isPlayer1Turn = true;
//let currentPlayer = "";
let currentPlayerMark = "";
let tile;
const tiles = document.querySelectorAll(".tile");
let playedTiles = [];
let gameWon;
const victory = document.getElementById("victory"); //Makes win statement visible
const round = document.getElementById("round"); //Declares winner
let p1Win = document.getElementById("p1win"); //DisplayScores
let p2Win = document.getElementById("p2win"); //DisplayScores
let catWin = document.getElementById("catwin"); //DisplayScores

//Scores  can I use const score: then use a logic IE: this.score to update/display each win.
let p1Score = 0;
let p2Score = 0;
let catScore = 0;

const winningConditions = [
  ["b1", "b2", "b3"],
  ["b4", "b5", "b6"],
  ["b7", "b8", "b9"],
  ["b1", "b4", "b7"],
  ["b2", "b5", "b8"],
  ["b3", "b6", "b9"],
  ["b1", "b5", "b9"],
  ["b3", "b5", "b7"],
];

//Display text module
const displayText = (() => {
  const displayNames = (player1Name, player2Name) => {
    player1Name = document.querySelector('#player1 input[name="name"]').value;
    player2Name = document.querySelector('#player2 input[name="name"]').value;
    player1Mark = document.querySelector(
      '#player1 input[name="choice"]:checked'
    ).value;
    player2Mark =
      player1Mark === null
        ? alert("Player 1 select X or O")
        : player1Mark === "X"
        ? "O"
        : "X";
    p1.textContent = `Player one: ${player1Name} is playing ${player1Mark} `;
    p2.textContent = `Player two: ${player2Name} is playing ${player2Mark}`;
    console.log("displayNames:", player1Name, player2Name);
  };

  function displayWin(winner) {
    //if (gameWon) {
    //update pXScore++; //How? this.pXScore?
    victory.style.display = "block";
    round.textContent = `This round goes to ${currentPlayerMark}.`; //Correct winner to proper winner IE: this.player or whatever
    p1Win.textContent = `${player1Name}'s score is ${p1Score}.`;
    p2Win.textContent = `${player2Name}'s  score is ${p2Score}.`;
    catWin.textContent = `TACOCAT's score is ${catScore}.`;
  }

  // const displayWin = () => { //How do I call currentPlayerName without another variable
  //   //Update pXScore++; //How? this.pXScore?
  //   victory.style.display = "block";
  //   round.textContent = `This round goes to ${currentPlayer}.`; //Correct winner to proper winner IE: this.player or whatever
  //   p1Win.textContent = `${player1Name}'s score is ${p1Score}.`;
  //   p2Win.textContent = `${player2Name}'s  score is ${p2Score}.`;
  //   catWin.textContent = `TACOCAT's score is ${catScore}.`;
  // };
  // const displayTie = () => {
  //   catScore++;
  //   victory.style.display = "block";
  //   round.textContent = "This round goes to the TACOCAT.";
  //   p1Win.textContent = `${player1Name}'s score is ${p1dScore}.`;
  //   p2Win.textContent = `${player2Name}'s  score is ${p2dScore}.`;
  //   catWin.textContent = `TACOCAT's score is ${catScore}.`;
  // };
  return { displayNames, displayWin };
})();

//Game Logic
//const gameLogic = (() => {  //Should the gameLogic be wrapped in a module or left open to the global?
//   return { checkWin, checkTie, updateBoard, reset };
//})();

const handlePlayerMove = (event) => {
  tile = event.target;
  if (!tile.textContent && !playedTiles.includes(tile)) {
    //This is because removeEventlListener was not working.
    if (isPlayer1Turn) {
      currentPlayerMark = player1Mark; //How do I get currentPlayerName for win without a second variable
      // updateBoard();
      isPlayer1Turn = false;
    } else {
      currentPlayerMark = player2Mark;
      // updateBoard();
      isPlayer1Turn = true;
    }
    console.log("Player", currentPlayerMark);
    //   console.log("handlePlayerMove", tile, "Player", currentPlayerMark);
    tile.textContent = currentPlayerMark;
    tile.removeEventListener("click", handlePlayerMove);
    playedTiles.push({ tile: tile.id, marker: currentPlayerMark });
    console.log("updateBoard playedTiles", playedTiles);
  checkWin();
  }
};

const checkWin = () => {
  if (playedTiles.length === 9) {
    //Do I move win declaration into displayText for congruency?
    catScore++;
    victory.style.display = "block";
    round.textContent = "This round goes to the TACOCAT.";
    console.log("checkWin is a Tie");
    //declareWin(cat);
    //return;
      } 
      
      
      else if (gameWon = winningConditions.some((combination) =>
  combination.every((i) => playedTiles.some(tile => tile.tile === i && tile.marker === currentPlayerMark)
))) {    
    console.log("checkWin:", currentPlayerMark, 'wins');
    displayText.displayWin(currentPlayerMark);
    }
};

//   const reset = () => {};

//eventListeners
playGameBtn.addEventListener("click", displayText.displayNames);
//playGameBtn.addEventListener("click", displayText.displayNames(tile));

for (let tile of tiles) {
  tile.addEventListener("click", handlePlayerMove);
}
