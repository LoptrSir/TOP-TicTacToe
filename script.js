//TTT the phoenix version from the ashes of spaghetti.

// declare winner get name without another variable. create a playerFactory to reduce declared variables and simplify bits. turn off tile listeners upon win.

//playerFactory
const playerFactory = function (name, mark) {
  return { name, mark, score: 0 };
};

//Declare variables
let player1 = playerFactory("Player 1", "X");
let player2 = playerFactory("Player 2", "O");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
//let player1Name; //migrate to pF
//let player1Mark; //migrate to pF
//let player2Name; //migrate to pF
//let player2Mark; //migrate to pF
const playGameBtn = document.getElementById("playGame");
let currentPlayer;
let isPlayer1Turn = true;
let tile;
const tiles = document.querySelectorAll(".tile");
let playedTiles = [];
let gameWon;
let cat;
const victory = document.getElementById("victory"); //Makes win statement visible
const round = document.getElementById("round"); //Declares winner
let p1Win = document.getElementById("p1win"); //DisplayScores
let p2Win = document.getElementById("p2win"); //DisplayScores
let catWin = document.getElementById("catwin"); //DisplayScores
//let p1Score = 0; //migrate to pF
//let p2Score = 0; //migrate to pF
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
  const displayNames = () => {
    // player1 = playerFactory(
    //   document.querySelector('#player1 input[name="name"]').value,
    //   document.querySelector('#player1 input[name="choice"]:checked').value
    // );
    // player2 = playerFactory(
    //   document.querySelector('#player2 input[name="name"]').value,
    //   player1.mark === null
    //     ? alert("Player 1 select X or O")
    //     : player1.mark === "X"
    //     ? "O"
    //     : "X"
    // );
    player1.name = document.querySelector('#player1 input[name="name"]').value;
    player2.name = document.querySelector('#player2 input[name="name"]').value;
    player1.mark = document.querySelector(
      '#player1 input[name="choice"]:checked'
    ).value;
    player2.mark =
      player1.mark === null
        ? alert("Player 1 select X or O")
        : player1.mark === "X"
        ? "O"
        : "X";
    p1.textContent = `Player one: ${player1.name} is playing ${player1.mark} `;
    p2.textContent = `Player two: ${player2.name} is playing ${player2.mark}`;
    console.log(
      "displayNames:",
      player1.name,
      player1.mark,
      player2.name,
      player2.mark
    );
  };

  function displayWin(winner) {
    if (winner === cat) {
      catScore++;
      victory.style.display = "block";
      round.textContent = "This round goes to the TACOCAT.";
      console.log("displayWin: TACOCAT");
    } else {
      currentPlayer.score++;
      victory.style.display = "block";
      round.textContent = `This round goes to ${currentPlayer.name} playing ${currentPlayer.mark}.`;
      //add remove listener here
    }
      p1Win.textContent = `${player1.name}'s score is ${player1.score}.`;
      p2Win.textContent = `${player2.name}'s  score is ${player2.score}.`;
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
  console.log("handlePlayerMove players:", player1, player2);
  if (!tile.textContent && !playedTiles.includes(tile)) {
    // if (isPlayer1Turn && player1) {
    //     currentPlayer = player1;
    //   } else if (!isPlayer1Turn && player2) {
    //     currentPlayer = player2;
    //   }
    currentPlayer = isPlayer1Turn ? player1 : player2;
    console.log("handlePlayerMove", currentPlayer);
    if (currentPlayer) {
      tile.textContent = currentPlayer.mark;
    }
    console.log("handlePlayerMove", currentPlayer.mark);
    //   console.log("handlePlayerMove", tile, "Player", currentPlayerMark);
    tile.removeEventListener("click", handlePlayerMove);
    playedTiles.push({ tile: tile.id, marker: currentPlayer.mark });
    isPlayer1Turn = !isPlayer1Turn;
    console.log(
      "updateBoard playedTiles:",
      playedTiles,
      "turn:",
      isPlayer1Turn
    );
    checkWin(currentPlayer);
  }
};

// const handlePlayerMove = (event) => {
//   tile = event.target;
//   if (!tile.textContent && !playedTiles.includes(tile)) {
//     //This is because removeEventlListener was not working.
//     if (isPlayer1Turn) {
//       currentPlayerMark = player1.mark;
//     } else {
//       currentPlayerMark = player2.mark;
//     }
//     console.log("Player", currentPlayerMark);
//     //   console.log("handlePlayerMove", tile, "Player", currentPlayerMark);
//     tile.textContent = currentPlayerMark;
//     tile.removeEventListener("click", handlePlayerMove);
//     playedTiles.push({ tile: tile.id, marker: currentPlayerMark });
//     isPlayer1Turn = !isPlayer1Turn;
//     console.log(
//       "updateBoard playedTiles:",
//       playedTiles,
//       "turn:",
//       isPlayer1Turn
//     );
//     checkWin();
//   }
// };

const checkWin = (currentPlayer) => {
  if (playedTiles.length === 9) {
    //Do I move win declaration into displayText for congruency?
    // catScore++;
    // victory.style.display = "block";
    // round.textContent = "This round goes to the TACOCAT.";
    console.log("checkWin is a Tie");
    displayText.displayWin(cat);
    //return;
  } else if (
    (gameWon = winningConditions.some((combination) =>
      combination.every((i) =>
        playedTiles.some(
          (tile) => tile.tile === i && tile.marker === currentPlayer.mark
        )
      )
    ))
  ) {
    tiles.forEach((tile) => {
        if (!tile.textContent && !playedTiles.includes(tile)) {
          tile.removeEventListener("click", handlePlayerMove);
        }
      });
    console.log("checkWin:", currentPlayer.mark, "wins");
    displayText.displayWin(currentPlayer);
  }
};

//   const reset = () => {};

//eventListeners
playGameBtn.addEventListener("click", displayText.displayNames);

for (let tile of tiles) {
  tile.addEventListener("click", handlePlayerMove);
}
