import Player from "./Components/Player"
import BoardGame from "./Components/Boargame"
import Log from "./Components/Log";
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winningCombinations";
import GameOver from "./Components/GameOver";

const  PLAYERS ={
  X: "Player 1",
  O: "Player 2"
}
const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];


function derivedGameBoard(gameTurns)
{
  let gameBoard = [...INITIAL_GAMEBOARD].map(arrays=>[...arrays]);

  for(const turn of gameTurns)
    {
        const {square, player} = turn;
        const {row, col} = square;
    
        gameBoard[row][col] = player;
    }

    return gameBoard;
}
function deriveGameWinner(gameBoard, player) {
  console.log("deriveGameWinner called with gameBoard:", gameBoard);

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    console.log(`Checking combination: ${combination}`, firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol);

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && secondSquareSymbol === thirdSquareSymbol) {
      winner = player.PLAYERS[firstSquareSymbol]; // Access the correct player name
      console.log("Winner found:", winner);
      break;
    }
  }

  return winner;
}


function App() {

  
  

const [player, setPlayerState] = useState({PLAYERS});
const [gameTurns, setGameTurns] = useState([])  

const activePlayer = derivedActivePlayer(gameTurns);
const gameBoard = derivedGameBoard(gameTurns);
const winner = deriveGameWinner(gameBoard, player);

console.log("Current gameTurns:", gameTurns);
console.log("Current gameBoard:", gameBoard);
console.log("Current winner:", winner);


function derivedActivePlayer(gameTurns)
{
  let currPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === 'X')
    {
      currPlayer = 'O';
    }
return currPlayer;
}

let isDraw = gameTurns.length ===9 && !winner;


function handleRestart()
{
  setGameTurns([]);
}

function handlePlayerNameChange(symbol, newName) {
  setPlayerState((previousPlayers) => {
    return {
      ...previousPlayers,
      PLAYERS: {
        ...previousPlayers.PLAYERS,
        [symbol]: newName,
      },
    };
  });
}


function handleActivePlayer(rowIndex, colIndex)
{
  const activePlayer = derivedActivePlayer(gameTurns);

  setGameTurns((prevTurns) => {

    const currentPlayer = derivedActivePlayer(prevTurns);

    let currPlayer = "X";

    if (prevTurns.length > 0 && prevTurns[0].player === 'X')
    {
      currPlayer = 'O';
    }
  
    const updateTurns = [{square: {row: rowIndex, col:colIndex}, player:currPlayer},...prevTurns,];
  
  return updateTurns;
  
  })
}
  return (
   <main>
    <div id = "game-container">
     <ol id = "players" className = "highlight-player">
      
     <Player name = {PLAYERS.X} symbol = "X" isActive={activePlayer === 'X' } onChangeName ={handlePlayerNameChange}/>
     <Player name = {PLAYERS.O} symbol = "O" isActive={activePlayer === 'O'} onChangeName ={handlePlayerNameChange}/>
     
     </ol>
      {(winner || isDraw) && (<GameOver winner = {winner} onRestart={handleRestart}/>)}
     <BoardGame onSelectSquare={handleActivePlayer} board = {gameBoard}/>
    </div>

    LOG 
    <Log turns ={gameTurns}/>
   </main>
  )
}

export default App
