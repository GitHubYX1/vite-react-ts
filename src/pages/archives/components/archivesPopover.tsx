import { memo, useState } from "react";
import { Popover, Table } from "antd";
import { archiverType } from "../../../types";

const { Column } = Table;

export default memo(function ArchivesPopover(props: { tags: archiverType }) {
  let [undergoState, undergoStateState] = useState(false);
  return (
    <Popover
      placement="bottomLeft"
      trigger="click"
      arrowPointAtCenter
      onVisibleChange={(br) => {
        undergoStateState(br);
      }}
      style={{ width: 700 }}
      content={
        <Table dataSource={props.tags.undergo} style={{ width: 500 }}>
          <Column title="开始时间" dataIndex="startTime" key="startTime" />
          <Column title="结束时间" dataIndex="endTime" key="endTime" />
          <Column title="单位名称" dataIndex="unit" key="unit" />
          <Column title="职位" dataIndex="position" key="position" />
        </Table>
      }
    >
      <span style={{ cursor: "pointer" }}>{undergoState ? "-" : "+"}</span>
    </Popover>
  );
});
