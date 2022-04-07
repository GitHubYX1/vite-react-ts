import { memo } from "react";
import { chatUser } from "../../../common/local-data";
import { ChatList } from "../chatCss";
import { Avatar } from "antd";
import { chatType } from "../../../types";

interface userType {
  id: string;
  chat: chatType[];
  idClick: Function;
}

export default memo(function UserList(props: userType) {
  const userTextInfo = (id: string) => {
    let info = props.chat.filter((item) => item.userId == id);
    if (info.length) {
      return info[info.length - 1].text;
    }
    return "";
  };
  return (
    <ChatList>
      {chatUser.map((item) => (
        <div
          className={
            props.id === item.id
              ? "user-item flex align_items user-select"
              : "user-item flex align_items"
          }
          onClick={() => props.idClick(item.id)}
          key={item.id}
        >
          <Avatar src={item.avatar} size={40}></Avatar>
          <div className="user-data">
            <div className="user-name">{item.name}</div>
            <div className="user-text">{userTextInfo(item.id)}</div>
          </div>
        </div>
      ))}
    </ChatList>
  );
});
