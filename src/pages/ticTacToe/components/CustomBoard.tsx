import { useState, useEffect } from "react";
import { Button, Input, message, Switch } from "antd";
import Square from "./square";

interface BoardType {
  board: string[][];
  colorLine: number[][];
  player: string;
  isRobotEnabled: boolean;
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
function Board({ board, colorLine, player, isRobotEnabled, onplay }: BoardType) {
  //点击事件
  const handleClick = (row: number, column: number) => {
    if (board[row][column] !== "" || colorLine.length !== 0) {
      return;
    }
    if (!isRobotEnabled || player !== "O") onplay(row, column);
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
    [
      { r: 0, c: -1 },
      { r: 0, c: 1 },
    ],
    // 垂直方向
    [
      { r: -1, c: 0 },
      { r: 1, c: 0 },
    ],
    // 左斜方向
    [
      { r: -1, c: -1 },
      { r: 1, c: 1 },
    ],
    // 右斜方向
    [
      { r: -1, c: 1 },
      { r: 1, c: -1 },
    ],
  ];
  let line: [number, number][] = [[row, column]];
  let maxLine:  [number, number][] = []
  let maxCount = 0;
  const connection = (r: number, c: number, j: number) => {
    let m = row + r,
      n = column + c;
    // 按当前方向进行连线
    while (m >= 0 && m < y && n >= 0 && n < x && newBoard[m][n] === currentPlayer) {
      count++;
      if (j === 1) line.unshift([m, n]);
      else line.push([m, n]);
      m += r;
      n += c;
    }
  };
  // 遍历所有方向
  for (const [a, b] of directions) {
    connection(a.r, a.c, 1);
    connection(b.r, b.c, 0);
    if (count >= targetCount) {
      return line;
    } else {
      if (count > maxCount) {
        maxCount = count;
        maxLine = [...line];
      }
      count = 1;
      line = [[row, column]];
    }
  }
  return maxLine;
};

// 查找最佳落子位置
const findBestMove = (newBoard: string[][], x: number, y: number, targetCount: number) => {
  // 基础检查
  if (!newBoard || !newBoard.length) return [-1, -1];
  
  // 1. 进攻策略：查找必胜位置（局部优先）
  const attackRange = Math.min(5, Math.max(x, y));
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (newBoard[row][col] === "") {
        newBoard[row][col] = "O";
        const victoryLine = calculateVictory(newBoard, row, col, x, y, targetCount, "O");
        newBoard[row][col] = "";
        
        if (victoryLine.length >= targetCount) {
          return [row, col]; // 发现必胜点
        }
      }
    }
  }
  
  // 2. 防守策略：评估并阻止对手威胁
  const threatPositions: {row: number, col: number, score: number}[] = [];
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (newBoard[row][col] === "") {
        newBoard[row][col] = "X";
        const victoryLine = calculateVictory(newBoard, row, col, x, y, targetCount, "X");
        if (victoryLine.length >= targetCount - 1) {
          // 记录高威胁位置
          threatPositions.push({row, col, score: victoryLine.length});
        }
        newBoard[row][col] = "";
      }
    }
  }
  
  // 如果发现威胁位置，优先防守
  if (threatPositions.length > 0) {
    threatPositions.sort((a, b) => b.score - a.score);
    return [threatPositions[0].row, threatPositions[0].col];
  }
  
  // 3. 占优策略：大棋盘适应性优化
  const centerRow = Math.floor(y / 2);
  const centerCol = Math.floor(x / 2);
  
  // 优先中心区域3x3
  for (let r = Math.max(0, centerRow-1); r <= Math.min(y-1, centerRow+1); r++) {
    for (let c = Math.max(0, centerCol-1); c <= Math.min(x-1, centerCol+1); c++) {
      if (newBoard[r][c] === "") {
        return [r, c];
      }
    }
  }
  
  // 次优选择：边中点
  const edgeMidPoints: [number, number][] = [
    [0, Math.floor(x/2)], [Math.floor(y/2), 0], 
    [Math.floor(y/2), x-1], [y-1, Math.floor(x/2)]
  ];
  
  for (const [row, col] of edgeMidPoints) {
    if (newBoard[row][col] === "") {
      return [row, col];
    }
  }
  
  // 4. 高级策略：模式识别与权重评估
  const positionScores = Array(y).fill(0).map(() => Array(x).fill(0));
  const directions = [[0,1],[1,0],[1,1],[1,-1]];
  
  // 评估每个空位的潜在价值
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (newBoard[row][col] === "") {
        // 检查周围己方棋子
        let adjacentScore = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (row+dr >=0 && col+dc >=0 && row+dr < y && col+dc < x &&
                newBoard[row+dr][col+dc] === "O") {
              adjacentScore += 1;
            }
          }
        }
        
        // 检查潜在连线机会
        let linePotential = 0;
        for (const [dx, dy] of directions) {
          let count = 0;
          // 正方向
          for (let i=1; i<targetCount; i++) {
            if (row + dx*i >=0 && row + dx*i < y && 
                col + dy*i >=0 && col + dy*i < x && 
                newBoard[row + dx*i][col + dy*i] === "O") {
              count++;
            } else break;
          }
          // 反方向
          for (let i=1; i<targetCount; i++) {
            if (row - dx*i >=0 && row - dx*i < y && 
                col - dy*i >=0 && col - dy*i < x && 
                newBoard[row - dx*i][col - dy*i] === "O") {
              count++;
            } else break;
          }
          
          linePotential += count;
        }
        
        positionScores[row][col] = adjacentScore * 2 + linePotential;
      }
    }
  }
  
  // 5. 随机策略：基于评分选择
  const availableMoves: {row: number, col: number, score: number}[] = [];
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      if (newBoard[row][col] === "") {
        availableMoves.push({row, col, score: positionScores[row][col]});
      }
    }
  }
  // 按评分排序
  availableMoves.sort((a, b) => b.score - a.score);
  // 返回最高分的空位
  if (availableMoves.length > 0) {
    const bestScore = availableMoves[0].score;
    // 筛选所有同分最优解
    const bestMoves = availableMoves.filter(m => m.score === bestScore);
    // 随机选择一个，增加变化性
    return [bestMoves[Math.floor(Math.random() * bestMoves.length)].row, 
            bestMoves[0].col];
  }
  // 最终兜底方案
  return [-1, -1];
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
    if (victoryLine.length >= targetCount) {
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
        <Board board={board} colorLine={colorLine} player={player} isRobotEnabled={isRobotEnabled} onplay={onplay}></Board>
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
