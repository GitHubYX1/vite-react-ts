import { memo, useState } from "react";
import { DialogueBox } from "../chatCss";
import { chatType } from "../../../types";
import { Avatar } from "antd";

interface dialogueType {
  id: string;
  chat: chatType[];
}

export default memo(function Dialogue(props: dialogueType) {
  return (
    <DialogueBox>
      {props.chat.map((item) => (
        <div key={item.id} className="chat-item">
          <div className="chat-user">
            <Avatar src={item.userAvatar} size={40}></Avatar>
            <div className="user-text">{item.userName}</div>
          </div>
          <div className="chat-text">{item.text}</div>
        </div>
      ))}
    </DialogueBox>
  );
});
