import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/GamePage.css";

type Player = "R" | "Y" | null;

const ROWS = 6;
const COLS = 7;


const createEmptyBoard = (): Player[][] => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

export const GamePage = () => {

  
  const navigate = useNavigate();
  
  const [board, setBoard] = useState<Player[][]>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>("R");
  const [winner, setWinner] = useState<Player>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);
  const [lastMove, setLastMove] = useState<{ row: number, col: number } | null>(null);
  //const [fallingPiece, setFallingPiece] = useState<{ row: number, col: number } | null>(null);

  const checkWinner = (board: Player[][], row: number, col: number, player: Player): boolean => {
    // Verificar filas
    if (!player) return false;

    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal \
      { dr: 1, dc: -1 } // Diagonal /
    ];

    for (const { dr, dc } of directions) {
      let count = 1;
      
      count += countInDirection(board, row, col, dr, dc, player);
      count += countInDirection(board, row, col, -dr, -dc, player);

      if (count >= 4) return true;
    }

    return false;
    
  }

  const countInDirection = (board: Player[][], row: number, col: number, dr: number, dc: number, player: Player): number => {

    let r = row + dr;
    let c = col + dc;
    let count = 0;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
      count++;
      r += dr;
      c += dc;
    }
    return count;
  }

  const dropPiece = (col: number) => {
    if (winner) return; // No hacer nada si ya hay un ganador o una pieza cayendo

    const newBoard = board.map((row: Player[]) => [...row]);

    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === null) {
        newBoard[row][col] = currentPlayer;
        setLastMove({ row: row, col });

        if (checkWinner(newBoard, row, col, currentPlayer)) {
          setBoard(newBoard);
          setWinner(currentPlayer);
          return;
        }

        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "R" ? "Y" : "R");
        return;
      }
    }
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer("R");
    setWinner(null);
  }
  return (
    <div style={styles.container}>
      <h1>Conecta 4</h1>
      {winner && (
        <h2>
          🎉 Gana {winner === "R" ? "🔴 Rojo" : "🟡 Amarillo"}
        </h2>
      )}
      <p>
        Turno:{" "}
        <span style={{ fontWeight: "bold" }}>
          {currentPlayer === "R" ? "🔴 Rojo" : "🟡 Amarillo"}
        </span>
      </p>
      <div className="previewRow">
        {Array.from({ length: COLS}).map((_, colIndex) => (
          <div key={colIndex} className="previewCell">
            {hoverCol === colIndex && (
              <div className={`piece preview ${currentPlayer === "R" ? "red" : "yellow"}`} />
            )}
          </div>
        )
            )}
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                onMouseEnter={() => setHoverCol(colIndex)}
                onMouseLeave={() => setHoverCol(null)}
                onClick={() => dropPiece(colIndex)}
              >
                {cell && (
                  <div
                    className={`piece ${cell === "R" ? "red" : "yellow"} ${
                      lastMove?.row === rowIndex && lastMove?.col === colIndex
                        ? "drop"
                        : ""
                    }`}
                    style={
                      lastMove?.row === rowIndex && lastMove?.col === colIndex
                        ? { "--drop-distance": `${rowIndex * 82}px` } as React.CSSProperties
                        : {}
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={resetGame} style={styles.reset}>
          Reiniciar
        </button>
        <button onClick={() => navigate("/")} style={styles.reset}>
          Ir al Login
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    color: "black",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
    flexDirection: "row",
  },
  board: {
    background: "#0f172a",
    padding: "10px",
    borderRadius: "8px",
  },
  row: {
    display: "flex",
  },
  cell: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    margin: 5,
    cursor: "pointer",
  },
  reset: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
};
