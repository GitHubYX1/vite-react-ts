import { useState, useRef } from "react";
import { Button, message } from "antd";
import { read, utils, writeFile } from "xlsx";
import { MergeContainer } from "./mergeCss";

//合并
export default function Merge() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);
  const importFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    console.log("file", file);
    setLoading(true);
    setProgress("开始合并问卷...");
    const titleList = [];
    const dataList = [];
    if (file) {
      for (let i = 0; i < file.length; i++) {
        const item = file[i];
        const name = item.name.split("2024")[0];
        const data: any = await excelFile(item);
        if (i === 0) {
          titleList.push("医院名称");
          for (const key in data[0]) {
            titleList.push(key);
          }
        }
        for (const son of data) {
          const datatable = [name];
          for (const key in son) {
            datatable.push(son[key]);
          }
          dataList.push(datatable);
        }
        setProgress(`成功合并${i + 1}个问卷`);
      }
    }
    exportExcel([titleList, ...dataList], "合并问卷");
    setLoading(false);
    setProgress(`问卷合并完成！`);
  };
  const excelFile = async (file: File) => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = function (ev) {
        try {
          const dataBinary = ev?.target?.result;
          const workbook = read(dataBinary, { type: "binary" });
          const firstWorkSheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = utils.sheet_to_json<any>(firstWorkSheet);
          console.log("data", data);
          resolve(data);
        } catch (error) {
          setLoading(false);
          message.error(error);
          setProgress("合并失败！");
          reject(error);
        }
      };
    });
  };
  const exportExcel = (content: string[][], title: string) => {
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(content);
    utils.book_append_sheet(wb, ws, "Sheet");
    writeFile(wb, title + ".xlsx");
  };
  return (
    <MergeContainer>
      <p className="merge-title">选择要合并的Excel文档</p>
      <Button type="primary" size="large" className="upload-file" loading={loading} block>
        导入Excel
        <input
          ref={fileInput}
          type="file"
          className="upload-input"
          accept=".xlsx"
          multiple
          onChange={e => {
            importFile(e);
          }}
        />
      </Button>
      <p className="merge-progress">{progress}</p>
    </MergeContainer>
  );
}
