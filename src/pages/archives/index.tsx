import { memo, useState } from "react";
import { LookArchives } from "./archivesCss";
import ArchivesTable from "./components/archivesTable";
import MessageBox from "./components/messageBox";
import ArchivesTop from "./components/archivesTop";
import { archiverType, inquiryType } from "../../types";
import { store } from "../../redux";
import { ADD, DELETE, MODIFY } from "../../common/constant";

// 获取返回的数据
interface keepType {
  ruleForm: archiverType;
  state: string;
  visible: boolean;
}

export default memo(function Archives() {
  let rowData: archiverType = {
    address: "",
    birthday: "",
    department: "",
    education: 1,
    id: "",
    idCard: "",
    marriage: 0,
    name: "",
    number: "",
    phone: "",
    position: "",
    sex: "",
    undergo: [],
  };
  let [data, dataList] = useState<archiverType[]>(store.getState()); //展示数据
  let [ListRow, setListRow] = useState(rowData); //档案数据
  let [loading, loadingState] = useState(false); //加载
  let [dialogVisible, setDialogVisible] = useState(false); //打开档案
  // 点击查询
  const inquiryClick = (e: { reset: boolean; dataQuery: inquiryType }) => {
    loadingState(true);
    let keyword = e.dataQuery.keyword;
    let education = e.dataQuery.education;
    let department = e.dataQuery.department;
    let position = e.dataQuery.position;
    let obj: archiverType[] = [];
    if (e.reset) {
      obj = store.getState();
    } else {
      obj = store
        .getState()
        .filter(
          (item) =>
            (item.number.indexOf(keyword) !== -1 ||
              item.name.indexOf(keyword) !== -1 ||
              item.idCard.indexOf(keyword) !== -1 ||
              item.address.indexOf(keyword) !== -1) &&
            (education ? item.education === education : true) &&
            (department ? item.department === department : true) &&
            (position ? item.position === position : true)
        );
    }

    setTimeout(() => {
      dataList(obj);
      loadingState(false);
    }, 1000);
  };
  // 获取数据
  const keepData = (e: keepType) => {
    if (e.state === ADD) {
      store.dispatch({ type: ADD, data: e.ruleForm });
    } else {
      store.dispatch({ type: MODIFY, data: e.ruleForm });
    }
    dataList(store.getState());
    setListRow(rowData);
    setDialogVisible(e.visible);
  };
  return (
    <LookArchives>
      <div className="archives_box">
        <ArchivesTop
          addData={() => {
            setDialogVisible(true);
          }}
          inquiryData={inquiryClick}
        ></ArchivesTop>
        <ArchivesTable
          data={data}
          loading={loading}
          deleteTable={(tags: archiverType) => {
            store.dispatch({ type: DELETE, data: tags });
            dataList(store.getState());
          }}
          modifyTable={(e: { tags: archiverType }) => {
            setListRow(e.tags);
            setDialogVisible(true);
          }}
        ></ArchivesTable>
      </div>
      {dialogVisible ? (
        <MessageBox
          visible={dialogVisible}
          ListRow={ListRow}
          handleCancel={(hand: boolean) => {
            setDialogVisible(hand);
            setListRow(rowData);
          }}
          keepData={keepData}
        ></MessageBox>
      ) : (
        ""
      )}
    </LookArchives>
  );
});
