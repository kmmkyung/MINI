import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  //state
  let [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  let [xIsNext, setXIsNext] = useState(true)
  let [stepNumber, setStepNumber] = useState(0)

  function handleClick(i){
    const newHistory = history.slice(0, stepNumber+1)
    const newCurrent = newHistory[newHistory.length-1] 
    const newSquares = newCurrent.squares.slice();        
    if(calculateWinner(newSquares) || newSquares[i]){
      return;
    }
    newSquares[i] = xIsNext? 'X':'O';
    setHistory([...newHistory,{squares: newSquares}])
    setXIsNext(previousState => !previousState)
    setStepNumber(newHistory.length)
  }

  function calculateWinner(squares){
    const lines = [[0,1,2], [3,4,5], [6,7,8], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    for (let i = 0; i < lines.length; i++){
      const [a,b,c] = lines[i]
      if(squares[a] && squares[a]===squares[b] && squares[a]===squares[c]){ return squares[a] }
    }
    return null;
  }
  let current = history[stepNumber] // 마지막 누른 것
  let winner = calculateWinner(current.squares)
  let status
  if(winner){
    status = `Winner: ${winner}`
  }
  else{
    status = `Next player: ${xIsNext? 'X' : 'O'}`
  }

  const moves = history.map(function(ele,idx){
    const desc = idx? `Go to move #${idx}` : 'Go to game start';
    return <li key={idx}><button className='move-button' onClick={()=>{jumpTo(idx)}}>{desc}</button></li>
  })

  function jumpTo(step){
    setStepNumber(step);
    setXIsNext((step % 2) === 0) // step가 짝수일 경우 xIsNext true
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board squares={current.squares} handleClick={handleClick}></Board>
      </div>
      <div className='game-info'>
        <div className='status'>{status}</div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  );
}

export default App;
