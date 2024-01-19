import { useState } from "react";
import { Button, Input, message } from "antd";
import Square from "./square";

function Board({ board, colorLine, onplay }: { board: string[][], colorLine: number[][], onplay: (row: number, column: number) => void }) {
  //点击事件
  const handleClick = (row: number, column: number) => {
    if (board[row][column] !== "" || colorLine.length != 0) {
      return;
    }
    onplay(row, column);
  };
  //判断颜色
  const checkColorClass = (rowIndex: number, squareIndex: number) => {
    if (colorLine.some((line: number[]) => line[0] === rowIndex && line[1] === squareIndex)) {
      return "active";
    }
    return "";
  }
  return (
    <>
      {board.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {row.map((square, squareIndex) => {
              return (
                <Square key={squareIndex} value={square} className={checkColorClass(rowIndex, squareIndex)} onClick={() => { handleClick(rowIndex, squareIndex) }}></Square>
              );
            })}
          </div>
        );
      })}
    </>
  );
}

//生成自定义棋盘
function ChessBoard({ x, y, targetCount, children }: { x: number, y: number, targetCount: number, children: React.ReactNode }) {
  const boardCount = x * y;
  const initialMatrix = Array.from({ length: y }, () => Array.from({ length: x }, () => ""));
  const [board, setBoard] = useState(initialMatrix);
  const [player, setPlayer] = useState("X");
  const [currentMove, setCurrentMove] = useState(0); //当前操作数
  const [colorLine, setColor] = useState<number[][]>([]);
  //点击棋盘
  const onplay = (row: number, column: number) => {
    const newBoard = [...board];
    newBoard[row][column] = player;
    setBoard(newBoard);
    const victoryLine = winVictory(newBoard, row, column);
    if (victoryLine.length) {
      setColor(victoryLine);
    } else {
      setPlayer(player === "X" ? "O" : "X");
      setCurrentMove(currentMove + 1);
    }
  }
  //计算胜利
  const winVictory = (newBoard: string[][], row: number, column: number) => {
    let count = 1;// 用于统计连续相同玩家的个数
    const directions = [
      // 水平方向
      { r: 0, c: -1 },
      { r: 0, c: 1 },
      // 垂直方向
      { r: -1, c: 0 },
      { r: 1, c: 0 },
      // 左斜方向
      { r: -1, c: -1 },
      { r: 1, c: 1 },
      // 右斜方向
      { r: -1, c: 1 },
      { r: 1, c: -1 },
    ];
    const line: [number, number][] = [[row, column]];
    // 遍历所有方向
    for (const { r, c } of directions) {
      let m = row + r, n = column + c;
      // 按当前方向进行连线
      while (m >= 0 && m < y && n >= 0 && n < x && newBoard[m][n] === player) {
        count++;
        line.push([m, n]);
        m += r;
        n += c;
      }
      if (count === targetCount) {
        return line;
      } else {
        count = 1;
        line.length = 1; // 重置连线数组，保留起始坐标
      }
    }
    return [];
  }
  //结算
  const status = () => {
    if (colorLine.length > 0) {
      return "胜利玩家: " + player;
    } else if (colorLine.length === 0 && currentMove === boardCount) {
      return "平局";
    }
    return "下个玩家: " + player;
  };
  //重置
  const reset = () => {
    setBoard(initialMatrix);
    setPlayer("X");
    setColor([]);
    setCurrentMove(0);
  };
  return (
    <div className="chess-board">
      <Button type="primary" onClick={reset} >重置</Button>
      {children}
      <div className="game-board">
        <div className="status">{status()}</div>
        <Board board={board} colorLine={colorLine} onplay={onplay}></Board>
      </div>
    </div>
  );
}

//自定义版
export default function CustomBoard({ children }: { children: React.ReactNode }) {
  const [start, setStart] = useState(false);
  const [x, setX] = useState(3);
  const [y, setY] = useState(3);
  const [targetCount, setCount] = useState(3);
  const firing = () => {
    // 定义边界值
    const minAxisSize = 3;
    const maxAxisSize = 20;
    const minTargetCount = 3;
    const maxTargetCount = 5;
    // 判断输入值是否合法
    if (x < 3 || y < 3) {
      message.error(`x轴或y轴不能小于${minAxisSize}`);
    } else if (x > 20 || y > 20) {
      message.error(`x轴或y轴不能大于${maxAxisSize}`);
    } else if (targetCount < minTargetCount || targetCount > maxTargetCount) {
      message.error(`胜利数不能小于${minTargetCount}或大于${maxTargetCount}`);
    } else if (x < targetCount || y < targetCount) {
      message.error("x轴或y轴不能小于胜利数");
    } else {
      setStart(true)
    }
  }
  return (
    <>
      {children}
      <div className="custom-board">
        {
          start ?
            <ChessBoard x={x} y={y} targetCount={targetCount}>
              <Button type="primary" style={{ marginLeft: 10 }} onClick={() => { setStart(false) }}>返回</Button>
            </ChessBoard>
            : (
              <div className="custom-set">
                <div className="custom-input">
                  <span>x轴:</span> <Input type="number" value={x} onChange={(e) => { setX(Number(e.target.value)) }} />
                </div>
                <div className="custom-input">
                  <span>y轴:</span> <Input type="number" value={y} onChange={(e) => { setY(Number(e.target.value)) }} />
                </div>
                <div className="custom-input">
                  <span>胜利数:</span> <Input type="number" min={3} max={5} value={targetCount} onChange={(e) => { setCount(Number(e.target.value)) }} />
                </div>
                <Button type="primary" onClick={firing} block>开始</Button>
              </div>
            )
        }
      </div>
    </>
  )
}