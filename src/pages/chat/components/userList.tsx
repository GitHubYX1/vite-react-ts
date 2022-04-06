import { memo, useState } from "react";
import { chatUser } from "../../../common/local-data";
import { ChatList } from "../chatCss";
import { Avatar } from "antd";

interface userType {
  id: string;
  idClick: Function;
}

export default memo(function UserList(props: userType) {
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
          <div className="user-text">{item.name}</div>
        </div>
      ))}
    </ChatList>
  );
});
