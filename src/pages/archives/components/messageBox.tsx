import { memo, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Radio,
  DatePicker,
  Select,
  Table,
  AutoComplete,
} from "antd";
import shortId from "shortid";
import moment from "moment";
import {
  educationList,
  departmentList,
  positionList,
  companyList,
} from "../../../common/local-data";
import { archiverType, undergoType } from "../../../types";
import { Message } from "../archivesCss";
import { store } from "../../../redux";

const { Option } = Select;
const { Column } = Table;

interface propsMessageObj {
  ListRow: archiverType;
  visible: boolean;
  handleCancel: Function;
  keepData: Function;
}

export default memo(function MessageBox(props: propsMessageObj) {
  let [ruleForm, ruleFormState] = useState(props.ListRow);

  const [form] = Form.useForm(); //定义form表单
  //修改输入框的内容
  const save = (value: string | number, key: string) => {
    ruleFormState({ ...ruleForm, [key]: value });
  };
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  //关闭弹窗
  const handleCancel = () => {
    form.resetFields();
    Modal.confirm({
      title: "是否关闭？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        props.handleCancel(false);
      },
    });
  };
  // 新增工作经历
  const addUndergo = () => {
    let undergo = {
      key: shortId.generate(),
      startTime: "",
      endTime: "",
      unit: "",
      position: "",
    };
    ruleFormState({
      ...ruleForm,
      undergo: [...ruleForm.undergo, undergo],
    }); //对象加载的方法
  };
  //编辑工作经历的数据
  const modifyUndergo = (
    value: string,
    key: string,
    text: "startTime" | "endTime" | "unit" | "position"
  ) => {
    let index = ruleForm.undergo.findIndex((item) => {
      return item.key === key;
    });
    ruleForm.undergo[index][text] = value;
    ruleFormState({
      ...ruleForm,
      undergo: ruleForm.undergo,
    });
  };
  // 保存数据
  const keepClick = () => {
    form.validateFields().then((res) => {
      console.log("打印保存的参数", res, ruleForm);
      Modal.confirm({
        title: ruleForm.id ? "是否修改员工档案？" : "是否添加员工档案？",
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          let state = "modify";
          if (ruleForm.id === "") {
            state = "add";
            ruleForm.id = shortId.generate();
            ruleFormState({
              ...ruleForm,
              id: ruleForm.id,
            });
          }
          props.keepData({ ruleForm: ruleForm, state, visible: false });
        },
      });
    });
  };
  // 编码判断
  const numberValidator = (rule: any, value: string) => {
    let list = store.getState();
    let data = list.filter(
      (item) => item.number === value && item.id !== ruleForm.id
    );
    if (data && data.length) {
      return Promise.reject(new Error("编号不能重复"));
    } else {
      return Promise.resolve();
    }
  };
  return (
    <Modal
      title={"员工信息" + (ruleForm.id ? "编辑" : "新增")}
      visible={props.visible}
      width={900}
      onCancel={handleCancel}
      footer={[
        <Button
          style={{ float: "left" }}
          type="primary"
          key="add"
          onClick={addUndergo}
        >
          新增工作经历
        </Button>,
        <Button type="primary" key="keep" onClick={keepClick}>
          保存
        </Button>,
        <Button key="close" onClick={handleCancel}>
          取消
        </Button>,
      ]}
    >
      <Message>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={ruleForm}
          labelAlign="right"
        >
          <div className="flex">
            <Form.Item
              label="员工编号"
              name="number"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
              rules={[
                { required: true, message: "编号未填写" },
                {
                  pattern: /^[0-9a-zA-Z]*$/,
                  message: "编号只能是以数字和字母组成",
                },
                { validator: numberValidator },
              ]}
            >
              <Input
                value={ruleForm.number}
                onBlur={(e) => save(e.target.value, "number")}
              />
            </Form.Item>

            <Form.Item
              label="员工姓名"
              name="name"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
              rules={[
                { required: true, message: "姓名未填写" },
                {
                  pattern: /^[\u4e00-\u9fa5a-z]+$/gi,
                  message: "姓名不能输入数字和特殊字符",
                },
              ]}
            >
              <Input
                value={ruleForm.number}
                onBlur={(e) => save(e.target.value, "name")}
              />
            </Form.Item>

            <Form.Item
              label="身份证号"
              name="idCard"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
              rules={[{ required: true, message: "身份证未填写" }]}
            >
              <Input onBlur={(e) => save(e.target.value, "idCard")} />
            </Form.Item>
          </div>
          <div className="flex">
            <Form.Item
              label="性别"
              name="sex"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
            >
              <Radio.Group onChange={(e) => save(e.target.value, "sex")}>
                <Radio value="男">男</Radio>
                <Radio value="女">女</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="出生日期"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
            >
              <DatePicker
                defaultValue={
                  ruleForm.birthday
                    ? moment(new Date(ruleForm.birthday)).add(8, "hour")
                    : undefined
                }
                style={{ width: "100%" }}
                onChange={(date, dateString) => save(dateString, "birthday")}
              />
            </Form.Item>
            <Form.Item
              label="联系电话"
              name="phone"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
              rules={[
                { required: true, message: "联系电话填写" },
                { pattern: /^1[34578]\d{9}$/, message: "电话号码填写有误" },
              ]}
            >
              <Input onBlur={(e) => save(e.target.value, "phone")} />
            </Form.Item>
          </div>
          <div className="flex">
            <Form.Item
              label="婚姻状况"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
            >
              <Select
                className="el-select"
                defaultValue={ruleForm.marriage === 0 ? "未婚" : "已婚"}
                placeholder="未婚"
                onChange={(value) => save(value, "marriage")}
              >
                <Option value={0}>未婚</Option>
                <Option value={1}>已婚</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="学历"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
            >
              <Select
                className="el-select"
                defaultValue={
                  ruleForm.education === 1
                    ? "大专"
                    : ruleForm.education === 2
                    ? "本科"
                    : ruleForm.education === 3
                    ? "硕士"
                    : "博士"
                }
                placeholder="大专"
                onChange={(value) => save(value, "education")}
              >
                {educationList.map((item) => {
                  return (
                    <Option value={item.number} key={item.number}>
                      {item.value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="住址"
            name="address"
            style={{ width: "100%", boxSizing: "border-box", paddingLeft: 30 }}
            labelCol={{ span: 2 }}
          >
            <Input onBlur={(e) => save(e.target.value, "address")} />
          </Form.Item>
          <div className="flex">
            <Form.Item
              label="所属部门"
              name="department"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
              rules={[{ required: true, message: "所属部门未选择" }]}
            >
              <Select
                className="el-select"
                placeholder="所属部门"
                onChange={(value) => save(value, "department")}
              >
                {departmentList.map((item) => {
                  return (
                    <Option value={item.value} key={item.id}>
                      {item.value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="职位"
              name="position"
              style={{ width: 282 }}
              labelCol={{ span: 8 }}
              rules={[{ required: true, message: "职位未选择" }]}
            >
              <Select
                className="el-select"
                placeholder="请选择职位"
                onChange={(value) => save(value, "position")}
              >
                {positionList.map((item) => {
                  return (
                    <Option value={item.value} key={item.id}>
                      {item.value}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </div>
          <Form.Item
            label="工作经历"
            name="undergo"
            style={{ width: "100%", boxSizing: "border-box", paddingLeft: 30 }}
            labelCol={{ span: 2 }}
          >
            <Table dataSource={ruleForm.undergo} pagination={false}>
              <Column
                title="开始时间"
                dataIndex="startTime"
                key="startTime"
                render={(tags, item: undergoType) => (
                  <DatePicker
                    defaultValue={
                      tags ? moment(new Date(tags)).add(8, "hour") : undefined
                    }
                    style={{ width: "100%" }}
                    disabledDate={(current: any) => {
                      return item.endTime
                        ? current > new Date(item.endTime) ||
                            current > Date.now() - 8.64e6
                        : current > Date.now() - 8.64e6;
                    }}
                    onChange={(remove, value) => {
                      modifyUndergo(value, item.key, "startTime");
                    }}
                  />
                )}
                width={158}
              />
              <Column
                title="结束时间"
                dataIndex="endTime"
                key="endTime"
                render={(tags, item: undergoType) => (
                  <DatePicker
                    defaultValue={
                      tags ? moment(new Date(tags)).add(8, "hour") : undefined
                    }
                    style={{ width: "100%" }}
                    disabledDate={(current: any) => {
                      return item.startTime
                        ? current < new Date(item.startTime) ||
                            current > Date.now() - 8.64e6
                        : current > Date.now() - 8.64e6;
                    }}
                    onChange={(remove, value) => {
                      modifyUndergo(value, item.key, "endTime");
                    }}
                  />
                )}
                width={158}
              />
              <Column
                title="单位"
                dataIndex="unit"
                key="unit"
                render={(tags, item: undergoType) => (
                  <AutoComplete
                    options={companyList}
                    placeholder="请选择单位"
                    defaultValue={tags}
                    filterOption={(inputValue, option: any) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onChange={(value) => {
                      modifyUndergo(value, item.key, "unit");
                    }}
                  />
                )}
                width={200}
              />
              <Column
                title="职位"
                dataIndex="position"
                key="position"
                render={(tags, item: undergoType) => (
                  <Select
                    className="el-select"
                    defaultValue={tags}
                    placeholder="请选择职位"
                    onChange={(value) => {
                      modifyUndergo(value, item.key, "position");
                    }}
                  >
                    {positionList.map((item) => {
                      return (
                        <Option value={item.value} key={item.id}>
                          {item.value}
                        </Option>
                      );
                    })}
                  </Select>
                )}
              />
              <Column
                title="操作"
                key="cz"
                render={(tags) => (
                  <Button
                    type="primary"
                    danger
                    onClick={() =>
                      ruleFormState({
                        ...ruleForm,
                        undergo: ruleForm.undergo.filter(
                          (item) => item.key !== tags.key
                        ),
                      })
                    }
                  >
                    删除
                  </Button>
                )}
                width={80}
              />
            </Table>
          </Form.Item>
        </Form>
      </Message>
    </Modal>
  );
});
