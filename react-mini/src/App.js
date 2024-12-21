import { useState } from 'react';
import './App.css';
import Board from './components/Board';

function App() {
  //state
  let [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  let [xIsNext, setXIsNext] = useState(true)
  let current = history[history.length-1] // 마지막 누른 것

  function handleClick(i){
    const squaresArr = current.squares.slice();        
    if(calculateWinner(squaresArr) || squaresArr[i]){
      return;
    }
    squaresArr[i] = xIsNext? 'X':'O';
    setHistory([...history,{squares: squaresArr}])
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
    return <li key={idx}><button>{desc}</button></li>
  })

  

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
