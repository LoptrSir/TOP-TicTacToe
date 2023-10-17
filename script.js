//TTT the phoenix version from the ashes of spaghetti.
// disable tiles until playGame clicked by moving tile listener into function and call at PlayGame?

//playerFactory
const playerFactory = function (name, mark) {
  return { name, mark, score: 0 };
};

//Declare variables in Global scale
let player1 = playerFactory("Player 1", "X");
let player2 = playerFactory("Player 2", "O");
let cat; //Tie game winner
let p1 = document.getElementById("p1");
const playGameBtn = document.getElementById("playGame");
let currentPlayer;
let isPlayer1Turn = true;
let tile;
const tiles = document.querySelectorAll(".tile");
let playedTiles = [];
let gameWon; //Need to be global?
const victory = document.getElementById("victory");
const score = document.getElementById("score");
const round = document.getElementById("round");
let p1Win = document.getElementById("p1win");
let p2Win = document.getElementById("p2win");
let catWin = document.getElementById("catwin");
let catScore = 0;
let isTie = false;
let reset = document.getElementById("reset");
let playAgain = document.getElementById("playAgain");
const player1NameInput = document.querySelector('#player1 input[name="name"]');
const player2NameInput = document.querySelector('#player2 input[name="name"]');
let player1ChoiceInputs = document.querySelectorAll(
  '#player1 input[name="choice"]'
);
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

//Displays Text Module
const displayText = (() => {

  const displayNames = () => {
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
    p1.textContent = `${player1.name} is playing ${player1.mark}     ${player2.name} is playing ${player2.mark}`;
    p1.style.whiteSpace = "pre";
    playGameBtn.disabled = true;
    player1NameInput.disabled = true;
    player2NameInput.disabled = true;
    player1ChoiceInputs.forEach((input) => (input.disabled = true));
    addTileListeners();
    console.log(
      "displayNames:",
      player1.name,
      player1.mark,
      player2.name,
      player2.mark
    );
  };

  function displayWin(winner) {
    victory.style.display = "block";
    score.style.display = "block";
    if (winner === cat) {
      isTie = true;
      catScore++;
      round.textContent = "This round goes to the TACOCAT";
      console.log("displayWin: TACOCAT");
    } else {
      currentPlayer.score++;
      round.textContent = `Congratulations ${currentPlayer.name} you have prevailed!`;
    }
    p1Win.textContent = `${player1.name}: ${player1.score}`;
    p2Win.textContent = `${player2.name}: ${player2.score}`;
    catWin.textContent = `TACOCAT's: ${catScore}`;
  }
  return { displayNames, displayWin };
})();

//Game Logic Module
const gameLogic = (() => {

  const handlePlayerMove = (event) => {
    tile = event.target; //Does it make sense to declare tile globally?
    console.log("gameLogic. players:", player1, player2);
    if (!tile.textContent && !playedTiles.includes(tile)) {
      currentPlayer = isPlayer1Turn ? player1 : player2;
      console.log("gameLogic.", currentPlayer);
      if (currentPlayer) {
        tile.textContent = currentPlayer.mark;
      }
      console.log("gameLogic.", currentPlayer.mark);
      tile.removeEventListener("click", handlePlayerMove);
      playedTiles.push({ tile: tile.id, marker: currentPlayer.mark });
      isPlayer1Turn = !isPlayer1Turn; //Changes player
      console.log(
        "updateBoard playedTiles:",
        playedTiles,
        "turn:",
        isPlayer1Turn
      );
      checkWin(currentPlayer);
    }
  };

  const checkWin = (currentPlayer) => {
    if (
      (gameWon = winningConditions.some((combination) =>
        combination.every(
          //Do I need gameWon variable?
          (i) =>
            playedTiles.some(
              (tile) => tile.tile === i && tile.marker === currentPlayer.mark
            ) //This iteration of tile is strictly related to looping not the global tile, yes?
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
    } else if (playedTiles.length === 9) {
      console.log("checkWin is a Tie");
      displayText.displayWin(cat);
    }
  };

  const playAgain = () => {
    victory.style.display = "none";
    playedTiles = [];
    tiles.forEach((tile) => {
      tile.textContent = "";
      tile.addEventListener("click", handlePlayerMove);
    });
    if (isTie === false) {
      isPlayer1Turn = !isPlayer1Turn;
    }
    console.log("playAgain isTie:", isTie);
    isTie = false;
    console.log("playAgain2 isTie", isTie);
  };

  const reset = () => {
    playAgain(); //reduces duplication of code, is this preferred?
    p1.textContent = "";
    playGameBtn.disabled = false;
    player1.score = 0;
    player2.score = 0;
    catScore = 0;
    isPlayer1Turn = true;
    score.style.display = "none";
    round.textContent = "";
    player1NameInput.disabled = false;
    player2NameInput.disabled = false;
    player1NameInput.value = "";
    player2NameInput.value = "";
    player1ChoiceInputs.forEach((input) => {
      input.disabled = false;
      input.checked = false;
    });
  };
  return { checkWin, handlePlayerMove, reset, playAgain };
})();

//eventListeners
playGameBtn.addEventListener("click", displayText.displayNames);
reset.addEventListener("click", gameLogic.reset);
playAgain.addEventListener("click", gameLogic.playAgain);

function addTileListeners() {
  for (let tile of tiles) {
    tile.addEventListener("click", gameLogic.handlePlayerMove);
  }
}



