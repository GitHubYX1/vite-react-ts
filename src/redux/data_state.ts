import { archiverType } from "../types";
import { ADD, DELETE, MODIFY } from "../common/constant";

interface actionType {
  type: "add" | "delete" | "modify";
  data: archiverType;
}

const listData: string = localStorage.getItem("listDataVueXText") || "";
const initState: archiverType[] = listData ? JSON.parse(listData) : [];
export default function dataStacte(preState = initState, action: actionType) {
  const { type, data } = action;
  console.log(type, data);
  switch (type) {
    case ADD: //增加
      localStorage.setItem(
        "listDataVueXText",
        JSON.stringify([...preState, data])
      );
      return [...preState, data];
    case DELETE: //删除
      let list = preState.filter((item: archiverType) => item.id !== data.id);
      localStorage.setItem("listDataVueXText", JSON.stringify([...list]));
      return [...list];
    case MODIFY: //修改
      let index = preState.findIndex((item) => {
        return item.id === data.id;
      });
      preState[index] = data;
      localStorage.setItem("listDataVueXText", JSON.stringify([...preState]));
      return [...preState];
    default:
      return preState;
  }
}
