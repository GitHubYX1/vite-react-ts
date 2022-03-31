import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd"; //引入antd的中文包
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/dist/locale/zh-cn";
moment.locale("zh-cn");

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <React.Fragment>
      <App />
    </React.Fragment>
  </ConfigProvider>,
  document.getElementById("root")
);
