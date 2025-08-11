import { useEffect, useState } from "react";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";

import { checkWinner } from "./utils/winner";
import { getAIMoverFromOpenRouter } from "./utils/aiOpenRouter";

const App = () => {
  // State for 3x3 Board (9 cells)

  const [board, setBoard] = useState(Array(9).fill(null));

  //Is it Player Turn?

  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  //Who won? (X wins or O wins or Draw)

  const [winner, setWinner] = useState(null);

  // Track the Scores

  const [score, setScore] = useState({ X: 0, O: 0 });

  //When a player click a square

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i] || winner) return;

    const newBoard = [...board];

    newBoard[i] = "X";

    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  useEffect(() => {
    // check if someone already won
    const result = checkWinner(board);

    if (result?.winner) {
      setWinner(result.winner);
      if (result.winner === "X" || result.winner === "O") {
        setScore((prev) => ({
          ...prev,
          [result.winner]: prev[result.winner] + 1, // FIXED
        }));
      }
      return; // stop here so AI won't move after win
    }

    // If it's AI's turn and game not over
    if (!isPlayerTurn && !winner) {
      const aiTurn = async () => {
        const move = await getAIMoverFromOpenRouter(board);
        if (move !== null && board[move] === null) {
          const newBoard = [...board];
          newBoard[move] = "O";
          setBoard(newBoard);
          setIsPlayerTurn(true);
        }
      };
      const timeout = setTimeout(aiTurn, 600);
      return () => clearTimeout(timeout);
    }
  }, [board, isPlayerTurn, winner]);

  // Restart the Game

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  return (
    <div className="min-h-screen font-poppins w-full bg-gradient-to-t from-slate-900 to-purple-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl  font-semibold mb-8">TicTac (AI)</h1>

      <ScoreBoard score={score} />

      <GameBoard board={board} handleClick={handleClick} />

      {winner && (
        <div className="mt-4 text-xl">
          {winner === "Draw" ? "It's a Draw" : `${winner} wins!`}
          <button
            onClick={restartGame}
            className="ml-4 px-4 py-2 bg-purple-600 text-white hover:bg-purple-500"
          >
            Play again!
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
