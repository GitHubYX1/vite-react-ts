import { memo } from "react";
import { Spin } from "antd";

export default memo(function loading() {
  return (
    <div className="loading">
      <Spin size="large" tip="Loading..."></Spin>
    </div>
  );
});
