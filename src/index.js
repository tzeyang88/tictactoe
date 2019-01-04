import React, { Component } from "react";
import ReactDOM from "react-dom";
import Board from "./components/Board";

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares)) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({ squares }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;
    let winner = calculateWinner(squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Move to #" + move : "Game start";
      return (
        <div key={move}>
          <button className='btn' onClick={() => this.jumpTo(move)}>{desc}</button>
        </div>
      );
    });

    let status;
    if (winner) {
      status = "Winner " + winner;
    } else {
      status = "Next player " + (this.state.xIsNext ? "X" : "O");
    }

    return (
        <div className="game">
          <Board onClick={i => this.handleClick(i)} squares={current.squares} />
          <div className="game-info">
            <div className='status'>{status}</div>
          </div>
          <div>{moves}</div>
        </div>
    );
  }
}

export default Game;

ReactDOM.render(<Game />, document.querySelector("#root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
