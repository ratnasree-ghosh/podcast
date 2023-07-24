import React from 'react';
import "./style.css";

 const Button = ({onClick,btnName, disabled, width ,style}) => {
  return (
    <div className='custom-button' onClick={onClick} disabled={disabled}  style={style}>{btnName} </div>
  )
}

export default Button;

//style={{width: width}}