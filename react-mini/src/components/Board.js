import React, { useState } from 'react';
import Square from './Square';
import '../css/Board.css'

function Board(){
  // state
  let [squares, setSquares] = useState(Array(9).slice())
  let [xIsNext,setXIsNext] = useState(true)
  let status = `Next Player ${xIsNext?'X':'O'}`

  // function
  function renderSquare(i){
    return <Square value={squares[i]} handleClick={()=>handleClick(i)}></Square>
  }

  function handleClick(i){
    const squaresArr = squares.slice();
    squaresArr[i] = xIsNext? 'X':'O';
    setSquares(squaresArr)
    setXIsNext(previousState => !previousState)
  }

  return (
    <div>
      <div className='status'>{status}</div>
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