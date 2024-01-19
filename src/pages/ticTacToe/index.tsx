import { useState } from "react";
import { Button } from "antd";
import { LeftOutlined } from '@ant-design/icons';
import StandardBoard from "./components/standardBoard";
import CustomBoard from "./components/CustomBoard";
import "./game.css";

//生成井字棋
export default function TicTacToe() {
  const [select, setSelect] = useState(0);
  return (
    <div className="game">
      {select === 0 ? (
        <div className="game-select">
          <p>请选择游玩版本</p>
          <Button type="primary" size="large" onClick={() => setSelect(1)} block>
            标准版
          </Button>
          <Button type="primary" size="large" onClick={() => setSelect(2)} block>
            自定义版
          </Button>
        </div>
      ) : select === 1 ? (
        <StandardBoard>
          <div className="game-title"><LeftOutlined onClick={() => setSelect(0)} />标准版井字棋</div>
        </StandardBoard>
      ) : (
        <CustomBoard>
          <div className="game-title"><LeftOutlined onClick={() => setSelect(0)} />自定义版井字棋</div>
        </CustomBoard>
      )}
    </div>
  );
}
