import { memo, useState, useRef } from "react";
import UserList from "./components/userList";
import Dialogue from "./components/dialogue";
import InputIndex from "./components/inputIndex";
import { ChatData } from "./chatCss";
import { chatStore } from "../../redux";
import { chatType } from "../../types";
import { ADD } from "../../common/constant";

export default memo(function Chat() {
  const [useId, useIdState] = useState("");
  const [chat, chatState] = useState<chatType[]>(chatStore.getState());
  const dialogueData = useRef<HTMLDivElement | null>(null);
  //获取输入框的数据
  const sendData = (e: chatType | null) => {
    // 判断是否有数据
    if (e) {
      if (chat.length) {
        let time = chat[chat.length - 1].time;
        if (Number(e.time) - Number(time) > 5 * 60 * 1000) e.lastTime = time;
      }
      chatStore.dispatch({ type: ADD, data: e });
    }
    chatState(chatStore.getState());
    setTimeout(() => {
      let child = document.getElementsByClassName("dialogue-list")[0];
      if (dialogueData.current)
        dialogueData.current.scrollTop = child.clientHeight;
    }, 400);
  };
  return (
    <ChatData>
      <h2>仿微信页面通讯</h2>
      <div className="chat-box">
        <UserList
          id={useId}
          chat={chat}
          idClick={(id: string) => {
            useIdState(id);
            sendData(null);
          }}
        />
        {useId ? (
          <div className="chat-right">
            <div
              className="chat-dialogue"
              ref={(el) => (dialogueData.current = el)}
            >
              <div className="dialogue-list">
                <Dialogue id={useId} chat={chat}></Dialogue>
              </div>
            </div>
            <InputIndex
              id={useId}
              sendData={(e: chatType) => {
                sendData(e);
              }}
            ></InputIndex>
          </div>
        ) : (
          ""
        )}
      </div>
    </ChatData>
  );
});
