import { memo } from "react";
import { Avatar, Image } from "antd";
import { chatType } from "../../../types";
import { offTime } from "../../../utils";
import { DialogueBox } from "../chatCss";

interface dialogueType {
  id: string;
  chat: chatType[];
}

export default memo(function Dialogue(props: dialogueType) {
  // 内容数据
  const DialogueData = (data: chatType) => {
    return (
      <div className="dialogue-data">
        <div className="dialogue-name">{data.userName}</div>
        <div className="dialogue-content">
          {!data.imageUrl?.length
            ? data.text
            : data.imageUrl.map((url, index) => {
                return (
                  <div className="dialogue-img" key={index}>
                    <Image src={url} />
                  </div>
                );
              })}
        </div>
      </div>
    );
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
              <DialogueData {...item}></DialogueData>
              <div className="dialogue-user">
                <Avatar src={item.userAvatar} size={40}></Avatar>
              </div>
            </div>
          ) : (
            <div className="dialogue-left">
              <div className="dialogue-user">
                <Avatar src={item.userAvatar} size={40}></Avatar>
              </div>
              <DialogueData {...item}></DialogueData>
            </div>
          )}
        </div>
      ))}
    </DialogueBox>
  );
});
