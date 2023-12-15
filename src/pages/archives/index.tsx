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
  const rowData: archiverType = {
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
  const [data, dataList] = useState<archiverType[]>(store.getState()); //展示数据
  const [ListRow, setListRow] = useState(rowData); //档案数据
  const [loading, loadingState] = useState(false); //加载
  const [dialogVisible, setDialogVisible] = useState(false); //打开档案
  // 点击查询
  const inquiryClick = (e: { reset: boolean; dataQuery: inquiryType }) => {
    loadingState(true);
    const { reset, dataQuery } = e;
    const filteredData = reset ? store.getState() : store.getState().filter(
      (item: any) =>
        ['number', 'name', 'idCard', 'address'].some((key: string) =>
          item[key].includes(dataQuery.keyword)
        ) &&
        (!dataQuery.education || item.education === dataQuery.education) &&
        (!dataQuery.department  || item.department === dataQuery.department ) &&
        (!dataQuery.position || item.position === dataQuery.position )
    )
    setTimeout(() => {
      dataList(filteredData);
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
