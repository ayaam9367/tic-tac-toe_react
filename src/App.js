import React, { useState } from "react";

const Game = () => {
  const [XisNext, setXisNext] = useState(true); //first turn is always of X
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  /**
   * This will declare the state as an array : ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'];
   * We will assign each of these states to the Square component and each state will record an individual value
   * The history array represents all board states, from the first to the last move, and has a shape like this:
    [
     // Before first move
     [null, null, null, null, null, null, null, null, null],
     // After first move
     [null, null, null, null, 'X', null, null, null, null],
     // After second move
     [null, null, null, null, 'X', null, null, null, 'O'],
     // ...
    ]
   */

    /**
     * To render the squares for the current move, you’ll want to read the last squares array from 
     * the history. 
     */
    const currentSquares = history[currentMove]; //this feels redundant, I mean, is currentSquares = history[history.length - 1]; ?

    //this will be called by Board component to update the game state
    function handlePlay(nextSquares){
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      setXisNext(!XisNext);
      /**
       * If you “go back in time” and then make a new move from that point, you only want to 
       * keep the history up to that point. Instead of adding nextSquares after all items
       *  (... spread syntax) in history, you’ll add it after all items in history.slice(0, currentMove + 1) 
       * so that you’re only keeping that portion of the old history.
       */
    }

    // pass XisNext, currentSquares, handlePlay to Board as props and Board component will be completely 
    //controlled by these props

    const moves = history.map((squares, move) => {
      let description;
      if(move > 0){
        description = 'Go to move #' + move;
      } else {
        description = 'Go to game start';
      }

      return(
        <li key = {move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    });

    function jumpTo(nextMove){
      setCurrentMove(nextMove);
      setXisNext(nextMove % 2 === 0);
    }

  return (
    <div className="game">
      <div className="game-board">
        <Board XisNext = {XisNext} squares = {currentSquares} onPlay = {handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

const Board = ({XisNext, squares, onPlay}) => {
  let status;
  const winner = calculateWinner(squares);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next Player: " + (XisNext ? "X" : "O");
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (XisNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares); // after making a new updated array I am sending it to handlePlay function
    //in the Game component to add it to history and indicate a state change as well
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



const calculateWinner = (squares) => {
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

export default Game;


/**
 * Future work : 
 * For the current move only, show “You are at move #…” instead of a button.
Rewrite Board to use two loops to make the squares instead of hardcoding them.
Add a toggle button that lets you sort the moves in either ascending or descending order.
When someone wins, highlight the three squares that caused the win (and when no one wins, display a message about the result being a draw).
Display the location for each move in the format (row, col) in the move history list.
 */
