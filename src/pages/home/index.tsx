import { memo, useState } from "react";
import logo from "../../logo.svg";
import { Button } from "antd";

export default memo(function About() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <div className="home-box">
          <img src={logo} className="App-logo" alt="logo" />
          <p>一个 react + Typescript + Vite Template 练习项目</p>
        </div>
      </header>
    </div>
  );
});
