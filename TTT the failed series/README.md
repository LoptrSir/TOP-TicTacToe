# Tic-Tac-Toe-TOP
This is The Odin Project course assignment Tic Tac Toe.
Primary focus is to work with factory functions and modules. Secondary focus is to practice what has been learned to date.

9/30 1540 created branch ReWorking1. going to work on simplifying and organizing code as its turned into a bowl of spaghetti.
9/27 1308 playedTiles is getting clogged up with stale data, need to figure out why.
0927 Round-12 created. need to figure out why switchPlayer after playAgain is not updating playedTiles.
9/26 1322 clearSelectedTiles, addButtonEventListener, playAgain switchPlayer call works by moving playerData to global scale.
1033 CSS style of tiles.
9/25 1252 working on playAgain button/functionality.
1042 Play Game btn disabled upon click.
9/21 1238 removeEventListeners prevents tile selection after a player wins.
1121 isGameWon functions incorporated checkWin removes redundant switchPlayer call.
9/20 1546 updateGame functions. 
1152 isGameWon passes cat as winner, updatePage declares TACOCAT as winner and displays scores. Clean up commented out notes.
9/19 1410 isGameWon declares Cat game, updatePage created, discovered bug: click played tile and SubmitButton causes playedTiles to add the disabled tile causing incorrect length.
1033 isGameWon button.disabled = true; removesListener.
1019 fresh day working on playedTiles functionality. Created Round-10 with script1.js
9/14 1329 trying to get playedTiles to not be overwritten.
1216 JS move isGameWon out of switchPlayer.
1147 JS deEventListener moved to playerFactory: addresses playedTile properly getting tileID.
9/13 1300 need to migrate isGameWon out of switchPlayer
1153 JS- switchPlayer blocks change to previously played tile. need to work on gameWon logic.
0957  JS- switchPlayer removeListener working, existing play need to prevent change in future turns.
9/11 1528 JS switchPlayer- switches to next player and alerts.  Need to keep previous play from going away and trigger removeListener for that tile.
9/11 1016 create branch Round-7 
9/8 1433 JS- what a confusing day. Numerous code changes, resolved multiple errors related to Submit button.
9/7 1315 JS- markTile functions.
9/7 1119 JS- markTile, fixed playGame 2x execution, 
9/6 1553 HTML- add hidden div for takeTurn instruction and submit button,  JS- Work on TakeTurn logic: P1 make your mark, 
9/5 1404 Commit: HTML- tab order P2 to PlayGame btn fixed, JS- X/O selectable by Enter, attachListeners prevents DOM out of order listeners. created: takeTurn, markTile, switchPlayer dCListeners.
9/1 1355 Commit: adjusted order of factory and modules, 
HTML Chrome doesn't like tab order: p1,x,o,p2 goes p1,x,p2. Incognito and < label for"name1"> doesn't work, works in Firefox. Removed Playing x:/o so that JS can indicate player name and piece playing. 
JS use Promise to fix issue of setDisplay returning undefined, need to better understand Promise.  setDisplay shows player name and piece, 
8/31 1458 Commit: Create round-deux branch, HTML player score structure, broke up functions into proper module and factory. Today has felt kind of like a waste, lots of spinning my wheels and getting nowhere.
8/30 1403 Commit: HTML tweaks, JS create playGame: gets player name and piece alerts if piece not selected
8/30 1158 Commit: most of HTML laid out
8/30/23 0943 Commit: Set up repo, HTML, JS, CSS files.