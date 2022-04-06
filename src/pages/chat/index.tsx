import { memo, useState } from "react";
import UserList from "./components/userList";
import Dialogue from "./components/dialogue";
import InputIndex from "./components/inputIndex";
import { ChatData } from "./chatCss";
import { chatStore } from "../../redux";
import { chatType } from "../../types";

export default memo(function Chat() {
  const [useId, useIdState] = useState("");
  const [chat, chatState] = useState<chatType[]>([
    {
      id: "ieLJQt9vm",
      text: "12121",
      time: 1649238559344,
      userAvatar: "../src/logo.svg",
      userId: "NQJF97stN",
      userName: "张三",
    },
  ]);
  //获取输入框的数据
  const sendData = (e: chatType) => {
    console.log("打印对话数据", e);
    chatState([...chat, e]);
  };
  return (
    <ChatData>
      <h2>仿微信页面通讯</h2>
      <div className="chat-box">
        <UserList id={useId} idClick={(id: string) => useIdState(id)} />
        <div className="chat-right">
          <Dialogue id={useId} chat={chat}></Dialogue>
          <InputIndex id={useId} sendData={sendData}></InputIndex>
        </div>
      </div>
    </ChatData>
  );
});
