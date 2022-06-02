import { useState, useImperativeHandle, forwardRef } from "react";
import { Modal, Button, Table } from "antd";
import { fillAnswerType } from "../../../types";
import XLSX from "xlsx"; //xlsx版本为@0.17.0
const { Column } = Table;

export default forwardRef(function FillInfo(props, ref) {
  const [visible, visibleState] = useState(false);
  const [title, titleState] = useState("");
  const [fillData, fillDataState] = useState<fillAnswerType[]>([]);
  // 子组件暴露方法
  useImperativeHandle(ref, () => ({
    open: (titles: string, fillAnswer: fillAnswerType[]) => {
      visibleState(true);
      titleState(titles);
      fillDataState(fillAnswer);
    },
  }));
  // 关闭
  const onCancel = () => {
    visibleState(false);
  };
  // 导出
  const exportClick = () => {
    const data = fillData.map((item) => ({
      ["时间"]: item.time,
      ["答案文本"]: item.content,
    }));
    // 新建空workbook，然后加入worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    // 设置每列的列宽，10代表10个字符，注意中文占2个字符
    ws["!cols"] = [{ wch: 20 }, { wch: 20 }];
    // 新建book
    const wb = XLSX.utils.book_new();
    // 生成xlsx文件(book,sheet数据,sheet命名)
    XLSX.utils.book_append_sheet(wb, ws, "数据详情");
    // 写文件(book,xlsx文件名称)
    XLSX.writeFile(wb, title + "--详情.xlsx");
  };
  return (
    <Modal
      title={title}
      visible={visible}
      width={900}
      onCancel={onCancel}
      footer={[
        <Button type="primary" key="export" onClick={exportClick}>
          导出Excel
        </Button>,
      ]}
    >
      <Table dataSource={fillData} bordered rowKey="content" pagination={false}>
        <Column
          title="提交答卷时间"
          align="center"
          dataIndex="time"
          key="time"
          width={180}
        />
        <Column
          title="答案文本"
          align="center"
          dataIndex="content"
          key="content"
        />
      </Table>
    </Modal>
  );
});
