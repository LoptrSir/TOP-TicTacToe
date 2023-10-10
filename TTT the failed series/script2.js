//Attempt to organize the relevent bits into better defined places.
//Review factory and module section. 
//Better understand: 
//when and where to declare and return items like player1Name etc.


//PLAYER FACTORY FUNCTION
const playerFactory = (() => {
  let player1Name,
  player2Name,
  player1ChoiceValue,
  player2ChoiceValue;

  function getPlayers() {
    player1Name = document.querySelector('#player1 input[name="name"]').value;
    const player1Choice = document.querySelector(
      '#player1 input[name="choice"]:checked'
      );
      console.log('getPlayers', player1Name);
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
  } else alert("Player1 Choose X or O");
  // return {player1Name,
  //   player2Name,
  //   player1ChoiceValue,
    // player2ChoiceValue}; //redundant as they are declared in playerFactory.
}

return {getPlayers};
})()

//GAME PLAY LOGIC MODULE
const gameLogic = (() => {
let playerData = {};//was in global scope

  function handlePlayGameEvent() {
    playerFactory.getPlayers();
    console.log(  playerFactory.player1Name,
      playerFactory.player2Name,
      playerFactory.player1ChoiceValue,
      playerFactory.player2ChoiceValue);
    }
    // if (!isEventHandled) {
    //   playGame.disabled = true;
    //   isEventHandled = true;
    //   try {
    //     const data = playerFactory.getPlayers();
    //     playerData = data;
    //     console.log("HPGEplayerDataRcvd:", playerData);
    //     displayController.setDisplay(playerData);
    //     displayController.takeTurn(playerData);
    //     const submitTurn = document.getElementById("submitTurn");
    //     submitTurn.addEventListener("click", () => {
    //       console.log(
    //         "HPGE submitTurn:",
    //         //tileID,
    //         'playedTiles:',
    //         displayController.playedTiles
    //       );
  
    //       if (
    //         !displayController.playedTiles.some((item) => item.tileID === tileID) &&
    //         tileID !== null
    //       ) {
    //         console.log(
    //           "HPGE if passed:",
    //           displayController.playedTiles,
    //           "TID:",
    //           tileID
    //         );
    //         displayController.isGameWon(playerData, tileID);
    //       } else {
    //         alert("Select a tile.");
    //       }
    //     });
    //   } catch (error) {
    //     console.log(error);
    //     alert(error);
    //   }
    // }
  

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
//end playGame bits


})()



//DISPLAY CONTROLLER MODULE
const displayController = (() => {


})()








  //EVENT LISTENERS MODULE
  const eventListeners = (() => {

    const radioLabels = document.querySelectorAll('input[type="radio"]');
    radioLabels.forEach((rButton) => {
      rButton.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          rButton.checked = true;
        }
      });
    });

    
  })();



