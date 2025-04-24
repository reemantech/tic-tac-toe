import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Square({ value, onSquareClick }) {

  let text_col = 'text-red-800'

  if (value === "X") {
    text_col = 'text-cyan-800'
  }
  return (
    <button className={['border-2 rounded-2xl m-1 w-10 h-10', text_col].join(' ')} onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {


    if (isGameCompleted(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice()
    nextSquares[i] = (xIsNext) ? "X" : "O";
    setSquares(nextSquares)
    setXIsNext(!xIsNext)

  }
  const winner = isGameCompleted(squares);
  let status;
  if (winner) {
    status = "Winner is " + winner;
    alert(`Wohhooo!! ${winner} won`);
    
  } else {
    status = 'Your Turn: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className='grid border-2 border-cyan-900 rounded-2xl p-3'>
      <div className='text-white border-cyan-900 border-b-2 m-2 pb-2'>{status}</div>
      <div>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  )
}
function App() {
  return (
    <Board />
  )
}

export default App

function isGameCompleted(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let x = 0; x < lines.length; x++) {
    const [a, b, c] = lines[x]

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}