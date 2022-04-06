import { chatType } from "../types";
import { ADD } from "../common/constant";

const listData: string = localStorage.getItem("chatDataList") || "";
const initState: chatType[] = listData ? JSON.parse(listData) : [];

interface chatActionType {
  type: "add";
  data: chatType;
}

export default function chatStacte(
  preState = initState,
  action: chatActionType
) {
  const { type, data } = action;
  switch (type) {
    case ADD: //增加
      localStorage.setItem("chatDataList", JSON.stringify([...preState, data]));
      return [...preState, data];
    default:
      return preState;
  }
}
