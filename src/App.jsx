import Player from "./Components/Player"
import BoardGame from "./Components/Boargame"
function App() {
  

  return (
   <main>
    <div id = "game-container">
     <ol id = "players">
      
     <Player name ="Player 1" symbol = "X"/>
     <Player name ="Player 2" symbol = "O"/>
     
     </ol>

     <BoardGame/>
    </div>

    LOG 
   </main>
  )
}

export default App
