// TOP project Tic Tac Toe
//This Version 9/18 1430 NO removeListener function
// TODO:
// play game logic: need to disable playedTiles from being changed by another player click.
// See HTML notes for tab experience.
// do I need to reset anything or will reset button take care of it.
// if play computer selected AI becomes player2, deselect play AI button,

const playerFactory = (() => {
  let player1Name,
    player2Name,
    player1ChoiceValue,
    player2ChoiceValue,
    getPlayers,
    tileID,
    tileClickHandler;

  const pFAttachListeners = (() => {
    const radioLabels = document.querySelectorAll('input[type="radio"]');
    radioLabels.forEach((rButton) => {
      rButton.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          rButton.checked = true;
        }
      });
    });

    tileClickHandler = (() => { 
      //const dCListeners = (() => {
      const buttons = document.querySelectorAll(".board button");
      buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          tileID = e.target.id;
          console.log("tileClicked", tileID);
          displayController.markTile(tileID);
        });
      });
    })(); //Is this IIFE redundant?

    function handlePlayGameEvent() {
      if (!isEventHandled) {
        isEventHandled = true; //Does this require resetting for next call?
        getPlayers()
          .then((playerData) => {
            console.log("playerDataRcvd:", playerData);
            displayController.setDisplay(playerData);
            displayController.takeTurn(playerData);

            //displayController.takeTurn(playerData, displayController.currentPlayer);
            const submitTurn = document.getElementById("submitTurn");
            submitTurn.addEventListener("click", () => {
              // const marker = displayController.currentPlayer.marker; //
              // const tileID = displayController.playerSelectedTile; //
              //displayController.playedTiles.push({ tileID, played: true, marker});
              // displayController.playedTiles.push({ tileID, played: true, marker: displayController.currentPlayer.marker });

              console.log("submitTurn; clicked");

              if (displayController.playedTiles.includes(tileID)) {
                const selectedTileButton = document.getElementById(tileID);
                selectedTileButton.removeEventListener(
                  "click",
                  tileClickHandler
                );
              }
              // if (displayController.playerSelectedTile) {// //Is this correct? Not reference tileID?
              //   const selectedTileButton = document.getElementById(displayController.playerSelectedTile);//
              //   selectedTileButton.removeEventListener('click', tileClickHandler);//
              // }//
              displayController.isGameWon(playerData, tileID);
            });
          })
          .catch((error) => {
            alert(error);
          });
      }
    }

    const playGame = document.getElementById("playGame");
    let isEventHandled = false;
    playGame.addEventListener("click", () => {
      handlePlayGameEvent();
    });

    playGame.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && !isEventHandled) {
        handlePlayGameEvent();
      }
    });
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
  return { tileClickHandler };
})();

//DisplayControllerModule

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
    //tileID,  //Moved to playerFactory
    playerSelectedTile = null,
    playedTiles = [];

  // const dCListeners = (() => {
  // const buttons = document.querySelectorAll(".board button");
  // buttons.forEach((button) => {
  // button.addEventListener("click", (e) => {
  // const tileID = e.target.id;
  // console.log("tileClicked", tileID);
  // markTile(tileID);
  // });
  // });
  // })();

  const reset = "";
  const quit = "";
  const playAI = "";

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

  function declareWinner() {
    console.log("declareWinner");
    // if () {
  }
  // add logic here for cat/winner statements and NewGame button.

  function isGameWon(playerData, tileID) {
    console.log("isGameWon", playedTiles);
    playedTiles.push({ tileID, played: true, marker: currentPlayer.marker });
    const tileButton = document.getElementById(tileID); //Added with line below
    tileButton.removeEventListener("click", playerFactory.tileClickHandler);
    //button.removeEventListener("click", markTile.tileID); //how can I tell remove worked?
    console.log("isGameWon1", currentPlayer, "tID", tileID);
    playerSelectedTile = null;
    // three is a row = declare winner
    //if () three in a row){
    //   weiner weiner
    //declareWinner();
    // }
    const keys = Object.keys(playedTiles);
    if (keys.length === 9) {
      //Does this get impacted by playedTiles.push(tileID)? I dont think so but need to be certain.
      //works.
      const pTurn = document.getElementById("pTurn"); //Change font bold and Red
      pTurn.textContent = `This round is a tie.  Ties go to the Cat.`;
      //declareWinner(); how do I pass result? return cat? declareWinner(cat):?
      // else return false; //game still in progress
      console.log("keys = 9");
      declareWinner();
    }
    switchPlayer(playerData);
    //switchPlayer(playerData, tileID);
  }

  function switchPlayer(playerData) {
    //function switchPlayer(playerData, tileID) {
    // why is tileID not read? It seems redundant to the function and it snot passed to the next, is this why?
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
    console.log("markTile1:", tileID);
    button = document.getElementById(tileID);
    if (!playedTiles.includes(tileID)) {
      //playedTiles.push(tileID); //Added with line above mod
      //if (!playedTiles[tileID]) {
      if (playerSelectedTile !== null) {
        let previousButton = document.getElementById(playerSelectedTile);
        previousButton.textContent = "";
        button.textContent = currentPlayer.marker;
        playerSelectedTile = tileID;
        console.log("previousIf", previousButton.id, "buttonIf", button.id);
      } else {
        button.textContent = currentPlayer.marker;
        playerSelectedTile = tileID;
        console.log("playerSelectedTile", playerSelectedTile);
      }
      console.log("markTile:", currentPlayer.marker);
      return button, tileID;
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
    quit,
    playAI,
    setDisplay,
    isGameWon,
    takeTurn,
    switchPlayer,
    nextTurn,
    markTile,
    declareWinner,
    playerSelectedTile,
    playedTiles,
    currentPlayer,
  };
})();
