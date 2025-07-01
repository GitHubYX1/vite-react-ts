import { useState, useEffect } from "react";
import { Button, Input, message, Switch } from "antd";
import Square from "./square";

interface BoardType {
  board: string[][];
  colorLine: number[][];
  onplay: (row: number, column: number) => void;
}
interface ChessBoardType {
  x: number;
  y: number;
  targetCount: number;
  isRobotEnabled: boolean;
  isRobotFirst: boolean;
  children: React.ReactNode;
}

// 生成棋盘
function Board({ board, colorLine, onplay }: BoardType) {
  //点击事件
  const handleClick = (row: number, column: number) => {
    if (board[row][column] !== "" || colorLine.length !== 0) {
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
  };
  return (
    <>
      {board.map((row, rowIndex) => {
        return (
          <div className="board-row" key={rowIndex}>
            {row.map((square, squareIndex) => {
              return <Square key={squareIndex} value={square} className={checkColorClass(rowIndex, squareIndex)} onClick={() => handleClick(rowIndex, squareIndex)}></Square>;
            })}
          </div>
        );
      })}
    </>
  );
}

//计算胜利
const calculateVictory = (newBoard: string[][], row: number, column: number, y: number, x: number, targetCount: number, currentPlayer: string) => {
  let count = 1; // 用于统计连续相同玩家的个数
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
    let m = row + r,
      n = column + c;
    // 按当前方向进行连线
    while (m >= 0 && m < y && n >= 0 && n < x && newBoard[m][n] === currentPlayer) {
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
};

// 查找最佳落子位置
const findBestMove = (newBoard: string[][], x: number, y: number, targetCount: number) => {
  // 添加空棋盘检查
  if (!newBoard || !newBoard.length) {
    return [-1, -1];
  }
  // 进攻策略：检查是否有一步能直接获胜的位置
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (newBoard[row][col] === "") {
        newBoard[row][col] = "O";
        const victoryLine = calculateVictory(newBoard, row, col, x, y, targetCount, "O");
        if (victoryLine.length >= targetCount) {
          newBoard[row][col] = "";
          return [row, col];
        }
        newBoard[row][col] = "";
      }
    }
  }
  // 防守策略：检查对手是否有一步能获胜的位置并进行阻止
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (newBoard[row][col] === "") {
        newBoard[row][col] = "X";
        const victoryLine = calculateVictory(newBoard, row, col, x, y, targetCount, "X");
        if (victoryLine.length >= targetCount) {
          newBoard[row][col] = "";
          return [row, col];
        }
        newBoard[row][col] = "";
      }
    }
  }

  // 占优策略：优先选择中心位置，其次是四个角落
  const centerRow = Math.floor(y / 2);
  const centerCol = Math.floor(x / 2);
  if (newBoard[centerRow][centerCol] === "") {
    return [centerRow, centerCol];
  }

  const corners: [number, number][] = [
    [0, 0],
    [0, x - 1],
    [y - 1, 0],
    [y - 1, x - 1],
  ];
  for (const [row, col] of corners) {
    if (newBoard[row][col] === "") {
      return [row, col];
    }
  }

  // 随机策略：如果以上都没有，则随机选择一个可用位置
  const availableMoves: [number, number][] = [];
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (newBoard[row][col] === "") {
        availableMoves.push([row, col]);
      }
    }
  }
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
};

//生成自定义棋盘
function ChessBoard({ x, y, targetCount, isRobotEnabled, isRobotFirst, children }: ChessBoardType) {
  const boardCount = x * y;
  const initialMatrix = Array.from({ length: y }, () => Array.from({ length: x }, () => ""));
  const [board, setBoard] = useState(initialMatrix);
  const [player, setPlayer] = useState(isRobotFirst ? "O" : "X");
  const [currentMove, setCurrentMove] = useState(0); //当前操作数
  const [colorLine, setColor] = useState<number[][]>([]);
  //点击棋盘
  const onplay = (row: number, column: number) => {
    const newBoard = [...board];
    newBoard[row][column] = player;
    setBoard(newBoard);
    // 计算并设置胜利线
    const victoryLine = calculateVictory(newBoard, row, column, x, y, targetCount, player);
    if (victoryLine.length) {
      setColor(victoryLine);
    } else {
      // 切换玩家，并增加操作步数
      setPlayer(player === "X" ? "O" : "X");
      setCurrentMove(currentMove + 1);
    }
  };

  //获取游戏状态
  const getStatus = () => {
    if (colorLine.length > 0) {
      return "胜利玩家: " + player;
    } else if (colorLine.length === 0 && currentMove === boardCount) {
      return "平局";
    }
    return "下个玩家: " + player;
  };
  //游戏重置
  const resetGame = () => {
    setBoard(initialMatrix);
    setPlayer(isRobotFirst ? "O" : "X");
    setColor([]);
    setCurrentMove(0);
  };
  useEffect(() => {
    if (isRobotEnabled && player === "O" && !colorLine.length && currentMove !== boardCount) {
      const timer = setTimeout(() => {
        const [row, col] = findBestMove(board, x, y, targetCount);
        if (row === -1 || col === -1) {
          return;
        }
        onplay(row, col);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [player, isRobotEnabled, board, colorLine]);
  return (
    <div className="chess-board">
      <Button type="primary" onClick={resetGame}>
        重置
      </Button>
      {children}
      <div className="game-board">
        <div className="status">{getStatus()}</div>
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
  const [isRobotEnabled, setIsRobotEnabled] = useState(false);
  const [isRobotFirst, setIsRobotFirst] = useState(false);
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
      setStart(true);
    }
  };
  return (
    <>
      {children}
      <div className="custom-board">
        {start ? (
          <ChessBoard x={x} y={y} targetCount={targetCount} isRobotEnabled={isRobotEnabled} isRobotFirst={isRobotFirst}>
            <Button type="primary" style={{ marginLeft: 10 }} onClick={() => setStart(false)}>
              返回
            </Button>
          </ChessBoard>
        ) : (
          <div className="custom-set">
            <div className="custom-input">
              <span>x轴:</span> <Input type="number" value={x} onChange={e => setX(Number(e.target.value))} />
            </div>
            <div className="custom-input">
              <span>y轴:</span> <Input type="number" value={y} onChange={e => setY(Number(e.target.value))} />
            </div>
            <div className="custom-input">
              <span>胜利数:</span> <Input type="number" min={3} max={5} value={targetCount} onChange={e => setCount(Number(e.target.value))} />
            </div>
            <div className="custom-switch">
              <span>启用机器人:</span>
              <Switch
                checked={isRobotEnabled}
                onChange={checked => {
                  setIsRobotEnabled(checked);
                  if (!checked) {
                    setIsRobotFirst(false);
                  }
                }}
              />
            </div>
            <div className="custom-switch">
              <span>机器人先手:</span>
              <Switch checked={isRobotFirst} disabled={!isRobotEnabled} onChange={checked => setIsRobotFirst(checked)} />
            </div>
            <Button type="primary" onClick={firing} block>
              开始
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
