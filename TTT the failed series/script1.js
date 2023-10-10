// TOP project Tic Tac Toe
// TODO: switchPlayer working (need logic to switch and ensure winner goes first) only first play is marked followed by an alert to select a tile. keep track of scores, disable Submit Turn upon win, reenable upon new game, finish reset logic, test quit logic, Move all listeners/removeListeners to a listener module.
//Current challenge: playAgain allows selected previously unplayed tiles only, even thought x/o is cleared and tiles are not greyed out.

//::Matriarchy — Today at 12:42 PM Arrays are objects. Objects are passed by reference/pointers. Something somewhere has an old reference/pointer. Im a bit hungover right now, so parsing through 300 lines of someone elses code ins't exactly in my wheelhouse, //but I'd wager thats what the issue is.
//Figure out how to use chrome debugger

// do I need to reset anything or will reset button take care of it.
// if play computer selected AI becomes player2, deselect play AI button,
// See HTML notes for tab experience.

let playerData = {};

const playerFactory = (() => {
  //Break this function up to only player related items, create another function for non related listeners and bits...
  let player1Name = "",
    player2Name = "",
    player1ChoiceValue = "",
    player2ChoiceValue = "",
    getPlayers,
    tileID;

  function tileClickHandler(e) {
    //Move into displayController
    tileID = e.target.id;
    console.log("tileCH", tileID);
    displayController.markTile(tileID);
  }

  const radioListeners = (() => {
    //Break this out as an eventListener module for all listeners.

    const radioLabels = document.querySelectorAll('input[type="radio"]');
    radioLabels.forEach((rButton) => {
      rButton.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          rButton.checked = true;
        }
      });
    });

    function addButtonEventListeners() {
      const buttons = document.querySelectorAll(".board button");
      buttons.forEach((button) => {
        button.addEventListener("click", tileClickHandler);
        console.log(`addButtonEventListeners: ${button.id}`);
      });
    }
    addButtonEventListeners(); //Called here instead of as an IIFE as its not introducing new variables into the global scope.

    function handlePlayGameEvent() {
      if (!isEventHandled) {
        playGame.disabled = true;
        isEventHandled = true;
        getPlayers()
          .then((data) => {
            //changed playerData to data.
            playerData = data;
            console.log("HPGEplayerDataRcvd:", playerData);
            displayController.setDisplay(playerData);
            displayController.takeTurn(playerData);
            const submitTurn = document.getElementById("submitTurn");
            submitTurn.addEventListener("click", () => {
              console.log(
                "HPGE submitTurn:",
                tileID,'playedTiles:',
                displayController.playedTiles
              ); //playAgain functions to this point. It seems playedTiles is not getting updated and alert to select a tile is displayed.
              if (
                !displayController.playedTiles.some(
                  (item) => item.tileID === tileID
                ) &&
                tileID !== null
              ) {
                console.log(
                  "HPGE if passed:",
                  displayController.playedTiles,
                  "TID:",
                  tileID
                );
                displayController.isGameWon(playerData, tileID);
              } else {
                alert("Select a tile.");
              }
            });
          })
          .catch((error) => {
            console.log(error);
            alert(error);
          });
      }
    }

    const playGame = document.getElementById("playGame");
    let isEventHandled = false;
    console.log("playGame", isEventHandled);
    playGame.addEventListener("click", () => {
      handlePlayGameEvent();
    });
    playGame.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && !isEventHandled) {
        handlePlayGameEvent();
      }
    });
    console.log("playGame1", isEventHandled);


    return { addButtonEventListeners };
  })();

  getPlayers = () => {
    return new Promise((resolve, reject) => {
      player1Name = document.querySelector('#player1 input[name="name"]').value;
      const player1Choice = document.querySelector(
        '#player1 input[name="choice"]:checked'
      );
      if (player1Choice) {
        player1ChoiceValue = player1Choice.value;
        player2ChoiceValue = player1ChoiceValue === "X" ? "O" : "X";
        player2Name = document.querySelector(
          '#player2 input[name="name"]'
        ).value;
        console.log(
          "getPlayers",
          "Player names:",
          player1Name,
          player2Name,
          player1ChoiceValue
        );
        resolve({
          player1Name,
          player2Name,
          player1ChoiceValue,
          player2ChoiceValue,
        });
      } else {
        reject("Player1 Choose X or O");
      }
    });
  };
  return { tileClickHandler, radioListeners };
})();

//const { handlePlayGameEvent} = playerFactory;

const displayController = (() => {
  let p1,
    p2,
    p1d,
    p2d,
    p1dMarker,
    p2dMarker,
    setDisplay,
    currentPlayer,
    button,
    playerSelectedTile = null,
    playedTiles = [],
    p1dScore = 0,
    p2dScore = 0,
    catScore = 0;

  //const reset = "";
  // const quit = ""; //wrap quit into reset function, any reason not to?
  // const playAI = "";

  let quit = document.getElementById("quit"); // change this to playGame button and add display info
  quit.addEventListener("click", () => {
    console.log("quit");
    reset();
  });

  function clearSelectedTiles() {
    playedTiles.forEach((playedTile) => {
      const tilesID = playedTile.tileID;
      const tile = document.getElementById(tilesID);
      tile.textContent = "";
      tile.disabled = false;
      console.log("clearSelectedTiles", playedTile.tileID);
    });
  }

  let playAgain = document.getElementById("playAgain"); //Need to reset playedTiles on webview.
  playAgain.addEventListener("click", () => {
    const victory = document.getElementById("victory");
    victory.style.display = "none";
    playerFactory.isEventHandled = false;
    playerSelectedTile = null;
    clearSelectedTiles();
    playedTiles = [];
    playerFactory.radioListeners.addButtonEventListeners();
    console.log(
      "playAgain",
      playerFactory.isEventHandled,
      "pTiles",
      playedTiles,
      currentPlayer.name,
      playerData,
      "playerST:",
      playerSelectedTile
    );
    switchPlayer(playerData);
    //Code that puts winner as first player, then feeds back into switchPlayer.
  });

  let resetting = document.getElementById("reset"); //Relocate to eventListener module
  resetting.addEventListener("click", reset);

  function reset() {
    console.log("reset");
    const victory = document.getElementById("victory");
    victory.style.display = "none";
    playerFactory.playGame.disabled = false;
    playerFactory.isEventHandled = false;
    playerSelectedTile = null;
    playedTiles = []; //Does this reset the array to blank?
    p1dScore = 0;
    p2dScore = 0;
    catScore = 0;
    playerFactory.player1Name = "";
    playerFactory.player1ChoiceValue = "";
    playerFactory.player2ChoiceValue = "";
  }

  setDisplay = (playerData) => {
    p1d = playerData.player1Name;
    p1dMarker = playerData.player1ChoiceValue;
    p1 = document.getElementById("p1");
    p1.textContent = `${p1d} has decided to play ${playerData.player1ChoiceValue}`;
    p2d = playerData.player2Name;
    p2dMarker = playerData.player2ChoiceValue;
    p2 = document.getElementById("p2");
    p2.textContent = `${p2d} will be playing ${playerData.player2ChoiceValue}`;
    console.log("SetDisplay:", p1d, p2d);
    return { p1, p2, p1d, p2d, setDisplay, playerData };
  };

  function updatePage(winner) {
    console.log("updatePage", winner);
    const victory = document.getElementById("victory");
    victory.style.display = "block";
    const talley = document.getElementById("talley");
    talley.style.display = "block";
    const round = document.getElementById("round");
    if (winner === "cat") {
      round.textContent = "This round goes to the TACOCAT.";
      console.log("UP if: CAT");
    } else if (winner === p1d) {
      round.textContent = `This round goes to ${p1d}.`;
      console.log("UP elif", p1d);
    } else {
      round.textContent = `This round goes to ${p2d}.`;
      console.log("UP else", p2d);
    }

    const p1Win = document.getElementById("p1win"); //Is this better done with one single div?
    p1Win.textContent = `${p1d}'s score is ${p1dScore}.`;
    const p2Win = document.getElementById("p2win");
    p2Win.textContent = `${p2d}'s  score is ${p2dScore}.`;
    const cat = document.getElementById("cat");
    cat.textContent = `TACOCAT's score is ${catScore}.`;
    console.log("UpdatePage1", currentPlayer, "p1d", p1d);
  }

  function isGameWon(playerData, tileID) {
    console.log("isGameWon", playedTiles);
    const button = document.getElementById(tileID);
    button.disabled = true;
    playedTiles.push({ tileID, played: true, marker: currentPlayer.marker });
    console.log("isGameWon1", currentPlayer.name);
    playerSelectedTile = null;

    let winningConditions = [
      ["b1", "b2", "b3"],
      ["b4", "b5", "b6"],
      ["b7", "b8", "b9"],
      ["b1", "b4", "b7"],
      ["b2", "b5", "b8"],
      ["b3", "b6", "b9"],
      ["b1", "b5", "b9"],
      ["b3", "b5", "b7"],
    ];

    console.log("IGW checkwin");
    for (const condition of winningConditions) {
      const isWinningConditionMet = condition.every((tileID) =>
        playedTiles.some(
          (playedTile) =>
            playedTile.tileID === tileID &&
            playedTile.marker === currentPlayer.marker
        )
      );

      if (isWinningConditionMet) {
        if (currentPlayer.name === playerData.player1Name) {
          p1dScore++;
          console.log("IGW checkWin P1dScore:", p1dScore);
        } else {
          p2dScore++;
          console.log("IGW checkWin p2dScore:", p2dScore);
        }
        console.log("IGW weiner weiner", currentPlayer);
        const pTurn = document.getElementById("pTurn");
        pTurn.textContent = "";
        removeTileListeners();
        updatePage(currentPlayer.name);
        return;
      }
    }
    if (playedTiles.length === 9) {
      catScore++;
      console.log("Cats Game", catScore);
      const pTurn = document.getElementById("pTurn");
      pTurn.textContent = "";
      removeTileListeners();
      updatePage("cat");
    } else {
      switchPlayer(playerData);
    }
  }

  function removeTileListeners() {
    //Move this to eventListener module
    const tiles = document.querySelectorAll(".board button");
    tiles.forEach((tile) => {
      tile.removeEventListener("click", playerFactory.tileClickHandler);
      console.log(`RemoveTileListener: ${tile.id}`);
    });
  }

  function switchPlayer(playerData) {
    if (currentPlayer.name === playerData.player1Name) {
      currentPlayer = {
        name: playerData.player2Name,
        marker: playerData.player2ChoiceValue,
      };
      console.log("switchPlayerIf", currentPlayer);
    } else {
      currentPlayer = {
        name: playerData.player1Name,
        marker: playerData.player1ChoiceValue,
      };
      console.log("switchPlayerElse", currentPlayer);
    }
    nextTurn();
  }

  function markTile(tileID) {
    console.log("markTile:", tileID);
    button = document.getElementById(tileID);
    if (!playedTiles.includes(tileID)) {
      if (playerSelectedTile !== null) {
        let previousButton = document.getElementById(playerSelectedTile);
        previousButton.textContent = "";
        button.textContent = currentPlayer.marker;
        playerSelectedTile = tileID;
        console.log("markTileIf", previousButton.id, "buttonIf", button.id);
      } else {
        button.textContent = currentPlayer.marker;
        playerSelectedTile = tileID;
        console.log("markTileElse", playerSelectedTile, 'tileID', tileID);
      }
      console.log(
        "markTile return:",
        currentPlayer.marker,
        playerSelectedTile,
        "tileID",
        tileID,
        "global tileID",
        playerFactory.tileID
      );
      //return button, tileID;
    }
  }

  function nextTurn() {
    const turnIndicator = document.getElementById("turn");
    turnIndicator.style.display = "block";
    const pTurn = document.getElementById("pTurn");
    pTurn.textContent = `${currentPlayer.name} Place your ${currentPlayer.marker}.`;
    console.log("nextTurn:", currentPlayer.name);
  }

  function takeTurn(playerData) {
    currentPlayer = {
      name: playerData.player1Name,
      marker: playerData.player1ChoiceValue,
    };
    console.log(
      "takeTurnCurrentPlayer:",
      playerData.player1Name,
      playerData.player1ChoiceValue
    );
    const turnIndicator = document.getElementById("turn");
    turnIndicator.style.display = "block";
    const pTurn = document.getElementById("pTurn");
    pTurn.textContent = `${currentPlayer.name} Place your ${currentPlayer.marker}.`;
    console.log("takeTurn:", currentPlayer.name);
  }
  return {
    reset,
    //quit,
    //playAI,
    setDisplay,
    isGameWon,
    takeTurn,
    switchPlayer,
    nextTurn,
    markTile,
    updatePage,
    p1dScore,
    p2dScore,
    playedTiles,
    removeTileListeners,
    //playAgain,
  };
})();
