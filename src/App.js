import React, { useState } from "react";

const Board = () => {
  const [markX, setMarkX] = useState("X");

  function onClickHandler() {
    if(markX === 'X') setMarkX('O');
    else setMarkX('X');
  }

  return (
    <>
      <div className="board-row" >
        <MyBox value = {markX} onClickProp={onClickHandler} />
        <MyBox value = {markX} onClickProp={onClickHandler} />
        <MyBox value = {markX} onClickProp={onClickHandler} />
      </div>

      <div className="board-row">
        <MyBox value = {markX} onClickProp={onClickHandler} />
        <MyBox value = {markX} onClickProp={onClickHandler} />
        <MyBox value = {markX} onClickProp={onClickHandler} />
      </div>

      <div className="board-row">
        <MyBox value = {markX} onClickProp={onClickHandler} />
        <MyBox value = {markX} onClickProp={onClickHandler} />
        <MyBox value = {markX} onClickProp={onClickHandler} />
      </div>
    </>
  );
};

const MyBox = ({value, onClickProp }) => {
  return (
    <button className="square" onClick={onClickProp}>
      {value}
    </button>
  );
};

export default Board;
