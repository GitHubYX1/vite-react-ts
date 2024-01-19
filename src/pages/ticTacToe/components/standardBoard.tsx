import { useState } from "react";
import { Button } from "antd";
import Square from "./square";

//计算胜利
function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = "";
  let line: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      winner = squares[a];
      line = lines[i];
    }
  }
  return { winner, line };
}

//矩阵
function Board({ xIsNext, squares, onPlay }: { xIsNext: boolean; squares: string[]; onPlay: (squares: string[]) => void }) {
  const { winner, line } = calculateWinner(squares);

  const handleClick = (i: number) => {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  };
  const status = () => {
    if (winner) {
      return "胜利者: " + winner;
    } else if (squares.filter((item) => item === "").length === 0) {
      return "平局";
    } else {
      return "下个玩家: " + (xIsNext ? "X" : "O");
    }
  };
  return (
    <>
      <div className="status">{status()}</div>
      <div className="board-row">
        <Square value={squares[0]} className={line.indexOf(0) === -1 ? "" : "active"} onClick={() => { handleClick(0); }} />
        <Square value={squares[1]} className={line.indexOf(1) === -1 ? "" : "active"} onClick={() => { handleClick(1); }} />
        <Square value={squares[2]} className={line.indexOf(2) === -1 ? "" : "active"} onClick={() => { handleClick(2); }} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} className={line.indexOf(3) === -1 ? "" : "active"} onClick={() => { handleClick(3); }} />
        <Square value={squares[4]} className={line.indexOf(4) === -1 ? "" : "active"} onClick={() => { handleClick(4); }} />
        <Square value={squares[5]} className={line.indexOf(5) === -1 ? "" : "active"} onClick={() => { handleClick(5); }} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} className={line.indexOf(6) === -1 ? "" : "active"} onClick={() => { handleClick(6); }} />
        <Square value={squares[7]} className={line.indexOf(7) === -1 ? "" : "active"} onClick={() => { handleClick(7); }} />
        <Square value={squares[8]} className={line.indexOf(8) === -1 ? "" : "active"} onClick={() => { handleClick(8); }} />
      </div>
    </>
  );
}

//标准版
export default function StandardBoard({children}: {children: React.ReactNode}) {
  const [history, setHistory] = useState<string[][]>([Array(9).fill("")]); //储存操作步骤
  const [currentMove, setCurrentMove] = useState(0); //当前操作数
  const currentSquares = history[currentMove]; //当前操作棋
  const xIsNext = currentMove % 2 === 0; //判断是那位玩家
  //获取数据
  const handlePlay = (squares: string[]) => {
    const nextHistory = [...history.slice(0, currentMove + 1), squares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };
  //回退
  const moves = history.map((_, index) => {
    return (
      <li key={index}>
        <Button type="primary" onClick={() => setCurrentMove(index)}>
          {index > 0 ? "转到移动 #" + index : "转到游戏开始"}
        </Button>
      </li>
    );
  });
  return (
    <>
      {children}
      <div className="standard-board">
        <div className="game-board">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>
    </>
  );
}
