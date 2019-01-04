import React from "react";
import "../css/Game.css";

function Square(props) {
  return (
    <button onClick={() => props.onClick()} className="square">
      <div className="input">{props.value}</div>
    </button>
  );
}

export default Square;
