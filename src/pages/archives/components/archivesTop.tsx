import { memo, useState } from "react";
import { Button, Input, Select } from "antd";
import {
  educationList,
  departmentList,
  positionList,
} from "../../../common/local-data";

const { Option } = Select;

interface propTopType {
  addData: Function;
  inquiryData: Function;
}

export default memo(function ArchivesTop(props: propTopType) {
  // 查询数据
  const inquiry = {
    keyword: "",
    education: "",
    department: "",
    position: "",
  };

  const [dataQuery, dataQueryState] = useState(inquiry);
  // 获取调查数据
  const saveQuery = (value: string, key: string) => {
    dataQueryState({ ...dataQuery, [key]: value });
  };
  return (
    <div className="archives_top flex flex_between">
      <div className="archives_screen flex flex_between">
        <div className="screen_item">
          关键字
          <Input
            placeholder="编号、姓名、身份证号、地址"
            value={dataQuery.keyword}
            onChange={(e) => saveQuery(e.target.value, "keyword")}
            className="el-input"
          />
        </div>
        <div className="screen_item">
          学历
          <Select
            className="el-select"
            defaultValue=""
            value={dataQuery.education}
            onChange={(e) => saveQuery(e, "education")}
            placeholder="全部"
          >
            <Option value="">全部</Option>
            {educationList.map((item) => {
              return (
                <Option value={item.number} key={item.number}>
                  {item.value}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="screen_item">
          所属部门
          <Select
            className="el-select"
            defaultValue=""
            value={dataQuery.department}
            onChange={(e) => saveQuery(e, "department")}
            placeholder="全部"
          >
            <Option value="">全部</Option>
            {departmentList.map((item) => {
              return (
                <Option value={item.value} key={item.number}>
                  {item.value}
                </Option>
              );
            })}
          </Select>
        </div>
        <div className="screen_item">
          职位
          <Select
            className="el-select"
            defaultValue=""
            value={dataQuery.position}
            onChange={(e) => saveQuery(e, "position")}
            placeholder="全部"
          >
            <Option value="">全部</Option>
            {positionList.map((item) => {
              return (
                <Option value={item.value} key={item.number}>
                  {item.value}
                </Option>
              );
            })}
          </Select>
        </div>
        <Button
          type="primary"
          onClick={() => props.inquiryData({ reset: false, dataQuery })}
        >
          查询
        </Button>
        <Button
          onClick={() => {
            dataQueryState(inquiry);
            props.inquiryData({ reset: true, dataQuery });
          }}
        >
          重置
        </Button>
      </div>
      <Button type="primary" onClick={() => props.addData()}>
        新增员工档案
      </Button>
    </div>
  );
});
