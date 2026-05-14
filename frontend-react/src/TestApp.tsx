import { useState } from "react";
import "./App.css";

export default function TestApp() {
  const [clicks, setClick] = useState(0);

  function handleClick() {
    setClick(clicks + 1);
  }

  const [check, setCheck] = useState(true);

  function change() {
    setCheck(!check);
  }

  let message;
  let content;
  if (check) {
    content = <Square />;
    message = "Hello there!";
  } else {
    content = <Circle />;
    message = "Go away!";
  }
  return (
    <>
      <Greeting greeting={message} />
      {content}

      <button onClick={change}>Change</button>

      <p>Independant Counters</p>
      <IndieCount />
      <br />

      <IndieCount />
      <p>Synced Counters</p>
      <SyncCount clicks={clicks} handleClick={handleClick} />
      <br />
      <SyncCount clicks={clicks} handleClick={handleClick} />

      <h1>Game</h1>
      <TicTacToe />
    </>
  );
}

function Greeting({ greeting }) {
  return <h1>{greeting}</h1>;
}

function Square() {
  return <p>Square</p>;
}
function Circle() {
  return <p>Circle</p>;
}

function IndieCount() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
}
function SyncCount({ clicks, handleClick }) {
  return <button onClick={handleClick}>Clicked {clicks} times</button>;
}

function TicTacToe() {
  const [boardState, setBoardState] = useState(new Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  const winner = calculateWinner(boardState);
  const draw = !winner && !boardState.includes(null);

  function handleClick(index) {
    if (boardState[index] || winner) return;
    const newBoardState = [...boardState];
    newBoardState[index] = player;
    setBoardState(newBoardState);
    setPlayer(player === "X" ? "O" : "X");
  }

  return (
    <>
      <div className="grid grid-cols-3 w-36">
        {boardState.map((value, index) => (
          <Cell
            key={index}
            value={value}
            index={index}
            handleClick={handleClick}
          />
        ))}
      </div>

      <Messages player={player} winner={winner} draw={draw} />
    </>
  );
}

const winStates = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(boardState) {
  for (const state of winStates) {
    const [a, b, c] = state;
    if (
      boardState[a] !== null &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    ) {
      return boardState[a];
    }
  }
  return null;
}

function Cell({ value, handleClick, index }) {
  return (
    <button
      onClick={() => handleClick(index)}
      className="w-12 h-12 bg-cyan-500"
    >
      {value}
    </button>
  );
}

function Messages({ player, winner, draw }) {
  let message = "";
  if (draw) {
    message = `Game over. It's a draw.`;
  } else if (winner) {
    message = `Game over. Player ${winner} has won.`;
  } else {
    message = `It is player ${player}'s turn`;
  }
  return <p>{message}</p>;
}
