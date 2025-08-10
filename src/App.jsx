import { useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";


const App = () => {
  // State for 3x3 Board (9 cells)

  const [board, setBoard] = useState(Array(9).fill(null));

  //Is it Player Turn?

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  //Who won? (X wins or O wins or Draw)

  const [isWinner, setIsWinner] = useState(null);

  // Track the Scores

  const [score, setScore] = useState({ X: 0, O: 0 });

  //When a player click a square


  return (
    <div className="min-h-screen font-poppins w-full bg-gradient-to-t from-slate-900 to-purple-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl  font-semibold mb-8">TicTac (AI)</h1>

      <ScoreBoard score={score}/>

      <GameBoard board={board}/>

    </div>
  );
};

export default App;
