import { messageType } from "../types";
import { ADD, DELETE, AGREE } from "../common/constant";

const listData: string = localStorage.getItem("messageCacheList") || "";
const initState: messageType[] = listData ? JSON.parse(listData) : [];

interface actionType {
  type: "add" | "delete" | "agree";
  data: messageType;
  index?: number;
}

export default function messageStacte(
  preState = initState,
  action: actionType
) {
  const { type, data, index } = action;
  console.log(type, data);
  switch (type) {
    case ADD: //增加
      localStorage.setItem(
        "messageCacheList",
        JSON.stringify([...preState, data])
      );
      return [...preState, data];
    case DELETE: //删除
      let list = preState.filter((item: messageType) => item.id !== data.id);
      localStorage.setItem("messageCacheList", JSON.stringify([...list]));
      return [...list];
    case AGREE: //点赞
      if (index !== undefined) preState[index].agree++;
      localStorage.setItem("messageCacheList", JSON.stringify([...preState]));
      return [...preState];
    default:
      return preState;
  }
}
