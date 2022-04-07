import { memo, useRef, useEffect } from "react";
import { DialogueBox } from "../chatCss";
import { chatType } from "../../../types";
import { Avatar } from "antd";

interface dialogueType {
  id: string;
  chat: chatType[];
}

export default memo(function Dialogue(props: dialogueType) {
  const offTime = (value: number) => {
    var date = new Date(value);
    var Y = date.getFullYear() + "-";
    var M =
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1) + "-";
    var D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var h =
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    let dt = new Date();
    let current = dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
    let system =
      date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    if (current == system) {
      return h + m;
    } else {
      return Y + M + D;
    }
  };
  return (
    <DialogueBox>
      {props.chat.map((item) => (
        <div key={item.id} className="dialogue-item">
          {item.lastTime ? (
            <div className="dialogue-time">
              <span>{offTime(Number(item.lastTime))}</span>
            </div>
          ) : (
            ""
          )}

          {item.userId == props.id ? (
            <div className="dialogue-right">
              <div className="dialogue-data">
                <div className="dialogue-name">{item.userName}</div>
                <div className="dialogue-content">{item.text}</div>
              </div>
              <div className="dialogue-user">
                <Avatar src={item.userAvatar} size={40}></Avatar>
              </div>
            </div>
          ) : (
            <div className="dialogue-left">
              <div className="dialogue-user">
                <Avatar src={item.userAvatar} size={40}></Avatar>
              </div>
              <div className="dialogue-data">
                <div className="dialogue-name">{item.userName}</div>
                <div className="dialogue-content">{item.text}</div>
              </div>
            </div>
          )}
        </div>
      ))}
    </DialogueBox>
  );
});
