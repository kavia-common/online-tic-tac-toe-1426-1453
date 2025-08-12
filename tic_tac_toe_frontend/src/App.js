import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * Calculate the winner of the tic-tac-toe game.
 * @param {Array<('X'|'O'|null)>} squares - array of 9 cells with 'X', 'O', or null
 * @returns {{ winner: 'X' | 'O' | null, line: number[] | null }}
 */
function calculateWinner(squares) {
  const lines = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // cols
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * Square (cell) component for a single board cell.
 * Minimal button styled as a square with accessibility labels.
 */
function Square({ value, onClick, index, disabled, isWinning }) {
  const labelBase = `Cell ${index + 1}`;
  const state = value ? (value === 'X' ? 'X' : 'O') : 'empty';
  const aria = `${labelBase} - ${state}`;
  const classes = ['cell'];
  if (value === 'X') classes.push('x');
  if (value === 'O') classes.push('o');
  if (isWinning) classes.push('winning');

  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={onClick}
      aria-label={aria}
      disabled={disabled}
    >
      {value}
    </button>
  );
}

/**
 * Board component that renders a 3x3 grid of squares.
 */
function Board({ squares, onCellClick, winningLine, gameOver }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe Board">
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          index={i}
          onClick={() => onCellClick(i)}
          isWinning={Array.isArray(winningLine) ? winningLine.includes(i) : false}
          disabled={gameOver || value !== null}
        />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
/**
 * Root App component that displays a minimalistic, light-themed Tic Tac Toe game.
 * - 3x3 board
 * - Two-player mode (alternating X and O)
 * - Status display (Next player, Winner, or Draw)
 * - Restart button to reset the game
 * - Responsive and centered layout
 */
function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const { winner, line } = useMemo(() => calculateWinner(squares), [squares]);
  const isDraw = !winner && squares.every((s) => s !== null);

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? 'Draw'
      : `Next: ${xIsNext ? 'X' : 'O'}`;

  const gameOver = Boolean(winner) || isDraw;

  /**
   * Handle a click on a cell. If the game is over or the cell is filled, ignore.
   * Otherwise place the current player's mark and toggle the turn.
   */
  function handleCellClick(index) {
    if (gameOver || squares[index]) return;
    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  /**
   * Restart the game by clearing the board and resetting to X's turn.
   */
  function restartGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="app">
      <header className="header" aria-label="App Header">
        <h1 className="title">Tic Tac Toe</h1>
        <p className="subtitle">Minimal two-player game</p>
      </header>

      <main className="game-area">
        <div className={`status ${winner ? 'status-winner' : isDraw ? 'status-draw' : ''}`} role="status" aria-live="polite">
          {status}
        </div>

        <Board
          squares={squares}
          onCellClick={handleCellClick}
          winningLine={line}
          gameOver={gameOver}
        />

        <div className="controls">
          <button className="btn" onClick={restartGame} aria-label="Restart the current game">
            Restart Game
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
