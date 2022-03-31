import { memo } from "react";
import { Button, Table, Space, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { archiverType } from "../../../types";
import ArchivesPopover from "./archivesPopover";
import { educationList } from "../../../common/local-data";

const { Column } = Table;

interface propsObj {
  data: archiverType[];
  loading: boolean;
  deleteTable: Function;
  modifyTable: Function;
}

export default memo(function ArchivesTable(props: propsObj) {
  return (
    <Table
      dataSource={props.data}
      bordered
      rowKey="id"
      loading={props.loading}
      pagination={false}
    >
      <Column
        title="+"
        key="+"
        width={32}
        render={(tags) => <ArchivesPopover tags={tags}></ArchivesPopover>}
      />
      <Column title="编号" dataIndex="number" key="number" />
      <Column title="姓名" dataIndex="name" key="name" />
      <Column title="身份证号码" dataIndex="idCard" key="idCard" />
      <Column title="出生日期" dataIndex="birthday" key="birthday" />
      <Column title="联系电话" dataIndex="phone" key="phone" />
      <Column
        title="学历"
        key="education"
        render={(tags) =>
          educationList.find((item) => tags.education === item.number)?.value
        }
      />
      <Column
        title="婚姻状况"
        key="marriage"
        render={(tags) => (tags.marriage === 1 ? "已婚" : "未婚")}
      />
      <Column title="地址" dataIndex="address" key="address" />
      <Column title="所属部门" dataIndex="department" key="department" />
      <Column title="职位" dataIndex="position" key="position" />
      <Column
        title="操作"
        key="cz"
        width={120}
        render={(tags) => (
          <Space size="middle">
            <Button
              type="primary"
              onClick={() => {
                props.modifyTable({ tags });
              }}
              icon={<EditOutlined />}
            ></Button>
            <Button
              type="primary"
              danger
              onClick={() => {
                Modal.confirm({
                  title: "是否删除列？",
                  okText: "确认",
                  cancelText: "取消",
                  onOk: () => {
                    props.deleteTable(tags);
                  },
                });
              }}
            >
              -
            </Button>
          </Space>
        )}
      />
    </Table>
  );
});
