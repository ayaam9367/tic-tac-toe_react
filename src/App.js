import React, { useState } from "react";

const Board = () => {
  const [XisNext, setXisNext] = useState(true); //first turn is always of X
  const [squares, setSquares] = useState(Array(9).fill(null));
  /**
   * This will declare the state as an array : ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
   * We will assign each of these states to the Square component and each state will record an individual value
   */

  let status;
  const winner = CalculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (XisNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || CalculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (XisNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXisNext(!XisNext);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onClickProp={() => handleClick(0)} />
        <Square value={squares[1]} onClickProp={() => handleClick(1)} />
        <Square value={squares[2]} onClickProp={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onClickProp={() => handleClick(3)} />
        <Square value={squares[4]} onClickProp={() => handleClick(4)} />
        <Square value={squares[5]} onClickProp={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onClickProp={() => handleClick(6)} />
        <Square value={squares[7]} onClickProp={() => handleClick(7)} />
        <Square value={squares[8]} onClickProp={() => handleClick(8)} />
      </div>
    </>
  );
};

const Square = ({ value, onClickProp }) => {
  return (
    <button className="square" onClick={onClickProp}>
      {value}
    </button>
  );
};

const CalculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Board;
