import { memo, useState, useRef } from "react";
import { Button, Card, Table, Progress } from "antd";
import { DownloadOutlined, TagFilled } from "@ant-design/icons";
import { questionType, fillAnswerType } from "../../types";
import { Step } from "./topicStepCss";
import { questionData } from "../../common/stepData";
import FillInfo from "./components/fillInfo";
import docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import JSZipUtils from "jszip-utils";
import { saveAs } from "file-saver";

const { Column } = Table;

export default memo(function TopicStep() {
  const questionList: questionType[] = questionData;
  const [loading, loadingState] = useState(false);
  const fillInfoRef = useRef<any>();
  // 打印
  const exportclick = () => {
    loadingState(true);
    let docxsrc = "/src/assets/mould/data.docx"; //模板文件的位置
    let title = "xx测评";
    const data = {
      form: {
        title: title,
      },
      list: questionList,
    };
    // 读取并获得模板文件的二进制内容
    JSZipUtils.getBinaryContent(docxsrc, function (error: any, content: any) {
      // docxsrc是模板。我们在导出的时候，会根据此模板来导出对应的数据
      // 抛出异常
      if (error) {
        throw error;
      }
      // 创建一个PizZip实例，内容为模板的内容
      let zip = new PizZip(content);
      // 创建并加载docx templater实例对象
      let doc = new docxtemplater().loadZip(zip);
      // 设置模板变量的值
      doc.setData({
        ...data.form,
        list: data.list,
      });
      try {
        // 用模板变量的值替换所有模板变量
        doc.render();
      } catch (error: any) {
        // 抛出异常
        let e = {
          message: error.message,
          name: error.name,
          stack: error.stack,
          properties: error.properties,
        };
        console.log(
          JSON.stringify({
            error: e,
          })
        );
        throw error;
      }

      // 生成一个代表docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
      let out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      // 将目标文件对象保存为目标类型的文件，并命名
      saveAs(out, title);
    });
    loadingState(false);
  };

  // 查看文本详情
  const lookInfo = (question: string, fillAnswer: fillAnswerType[]) => {
    fillInfoRef.current.open(question, fillAnswer);
  };
  return (
    <Step>
      <h2>xx测评</h2>
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        onClick={exportclick}
        size="large"
        loading={loading}
      >
        进度下载
      </Button>
      <div className="question-list">
        {questionList.map((item) => (
          <Card className="question-card" key={item.id}>
            <div className="question-title">
              <TagFilled className="icon" />
              {item.questionContent}
              <span>[{item.type}]</span>
            </div>
            {item.type !== "填空" ? (
              <Table
                dataSource={item.answer}
                bordered
                rowKey="content"
                pagination={false}
              >
                <Column
                  title="选项"
                  align="center"
                  dataIndex="content"
                  key="content"
                />
                <Column
                  title="样本量"
                  align="center"
                  dataIndex="count"
                  key="count"
                />
                <Column
                  title="比例"
                  align="center"
                  dataIndex="ratio"
                  key="ratio"
                  render={(tags) => (
                    <div style={{ paddingRight: "20px" }}>
                      <Progress strokeWidth={20} percent={tags} />
                    </div>
                  )}
                />
              </Table>
            ) : (
              <Button
                type="primary"
                size="large"
                onClick={() => {
                  lookInfo(
                    item.questionContent,
                    item.fillAnswer ? item.fillAnswer : []
                  );
                }}
              >
                查看详情信息
              </Button>
            )}
          </Card>
        ))}
      </div>
      <FillInfo ref={fillInfoRef}></FillInfo>
    </Step>
  );
});
