// import React, { useState } from 'react';
import Square from './Square';
import '../css/Board.css'

function Board(props){
  // function
  function renderSquare(i){
    return <Square value={props.squares[i]} handleClick={()=>props.handleClick(i)}></Square>
  }

  return (
    <div className='board-wrapper'>
      <div className='board-row'>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className='board-row'>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className='board-row'>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export default Board