import React, { useState } from 'react';
import Square from './Square';
import '../css/Board.css'

function Board(){
  // state
  let [squares, setSquares] = useState(Array(9).slice())
  let [xIsNext, setXIsNext] = useState(true)

  // function
  function renderSquare(i){
    return <Square value={squares[i]} handleClick={()=>handleClick(i)}></Square>
  }

  function handleClick(i){
    const squaresArr = squares.slice();    
    if(calculateWinner(squaresArr) || squaresArr[i]){
      return;
    }
    squaresArr[i] = xIsNext? 'X':'O';
    setSquares(squaresArr)
    setXIsNext(previousState => !previousState)
  }

  function calculateWinner(squares){
    const lines = [[0,1,2], [3,4,5], [6,7,8], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    for (let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i]
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){ return squares[a] }
    }
    return null;
  }

  let winner = calculateWinner(squares)
  let status
  if(winner){
    status = `Winner: ${winner}`
  }
  else{
    status = `Next player: ${xIsNext? 'X' : 'O'}`
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