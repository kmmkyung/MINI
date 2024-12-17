import React from 'react';
import '../css/Square.css'

function Square(props){
  return(
    <button className='square' onClick={props.handleClick}>
      {props.value}
    </button>
  )
}

export default Square