//TTT the phoenix version from the ashes of spaghetti.
// disable tiles until playGame clicked by moving tile listener into function and call at PlayGame? disable 'this round goes to' upon playAgain, reset: remove player names from input field and deselect x/o,

//playerFactory
const playerFactory = function (name, mark) {
  return { name, mark, score: 0 };
};

//Declare variables
let player1 = playerFactory("Player 1", "X");
let player2 = playerFactory("Player 2", "O");
let p1 = document.getElementById("p1");
let p2 = document.getElementById("p2");
let cat; //Tie game winner
const playGameBtn = document.getElementById("playGame");
let currentPlayer;
let isPlayer1Turn = true;
let tile;
const tiles = document.querySelectorAll(".tile");
let playedTiles = [];
let gameWon;
const victory = document.getElementById("victory"); //Makes win statement visible
const score = document.getElementById("score");
const round = document.getElementById("round"); //Declares winner
let p1Win = document.getElementById("p1win"); //DisplayScores
let p2Win = document.getElementById("p2win"); //DisplayScores
let catWin = document.getElementById("catwin"); //DisplayScores
let catScore = 0;
let reset = document.getElementById("reset");
let playAgain = document.getElementById("playAgain");

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

//Display text module  playGameBtn.addEventListener("click", displayText.displayNames);
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
    document.querySelector('#player1 input[name="name"]').disabled = true;
    const player1ChoiceInputs = document.querySelectorAll(
      '#player1 input[name="choice"]'
    );
    player1ChoiceInputs.forEach((input) => (input.disabled = true));
    document.querySelector('#player2 input[name="name"]').disabled = true;
    const player2ChoiceInputs = document.querySelectorAll(
      '#player2 input[name="choice"]'
    );
    player2ChoiceInputs.forEach((input) => (input.disabled = true));
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
      catScore++;
      round.textContent = "This round goes to the TACOCAT";
      console.log("displayWin: TACOCAT");
    } else {
      currentPlayer.score++;
      round.textContent = `This round goes to ${currentPlayer.name}`;
      //add remove listener here
    }
    p1Win.textContent = `${player1.name}: ${player1.score}`;
    p2Win.textContent = `${player2.name}: ${player2.score}`;
    catWin.textContent = `TACOCAT's: ${catScore}`;
  }

  return { displayNames, displayWin };
})();

//Game Logic
const gameLogic = (() => {
  const handlePlayerMove = (event) => {
    tile = event.target;
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

  const checkWin = (currentPlayer) => {
    if (
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
    } else if (playedTiles.length === 9) {
      console.log("checkWin is a Tie");
      displayText.displayWin(cat);
    }
  };

  const playAgain = () => {
    //Vet the code below
    victory.style.display = "none";
    playedTiles = [];
    tiles.forEach((tile) => {
      tile.textContent = ""; // Clear the tile text if necessary
      tile.addEventListener("click", handlePlayerMove);
    });
  };

  const reset = () => {
    //Vet the code below
    playAgain();
    p1.textContent = "";
    playGameBtn.disabled = false;
    player1.score = 0;
    player2.score = 0;
    catScore = 0;
    victory.style.display = "none";
    //clears player names and marker selection, but cannot enter new player or marker
    document.querySelector('#player1 input[name="name"]').disabled = false;
    const player1ChoiceInputs = document.querySelectorAll(
      '#player1 input[name="choice"]'
    );
    player1ChoiceInputs.forEach((input) => {
      input.disabled = false;
      input.checked = false;
    });
    document.querySelector('#player2 input[name="name"]').disabled = false;
    const player2ChoiceInputs = document.querySelectorAll(
      '#player2 input[name="choice"]'
    );
    player2ChoiceInputs.forEach((input) => (input.disabled = false));

    document.querySelector('#player1 input[name="name"]').value = "";
    document.querySelector('#player2 input[name="name"]').value = "";
    // const player1ChoiceInputs = document.querySelectorAll('#player1 input[name="choice"]');
    // player1ChoiceInputs.forEach((input) => {
    //   input.disabled = false;
    // //   input.checked = false;
    // });
  };
  return { checkWin, handlePlayerMove, reset, playAgain };
})();

//eventListeners
playGameBtn.addEventListener("click", displayText.displayNames);

for (let tile of tiles) {
  tile.addEventListener("click", gameLogic.handlePlayerMove);
}

reset.addEventListener("click", gameLogic.reset);
playAgain.addEventListener("click", gameLogic.playAgain);
