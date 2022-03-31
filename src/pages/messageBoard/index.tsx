import { memo, useState } from "react";
import MessagePublish from "./components/messagePublish";
import MessageContent from "./components/messageContent";
import { Board } from "./messageCss";
import { messageType } from "../../types";
import { messageStore } from "../../redux";
import { ADD, DELETE, AGREE } from "../../common/constant";

export default memo(function MessageBoard() {
  const [messageList, messageState] = useState<messageType[]>(
    messageStore.getState()
  );
  return (
    <Board>
      <h2>留言板</h2>
      <MessageContent
        data={messageList}
        agreeClick={(index: number) => {
          messageStore.dispatch({
            type: AGREE,
            data: messageList[index],
            index,
          });
          messageState(messageStore.getState());
        }}
        dispatch={(data: messageType) => {
          messageStore.dispatch({ type: DELETE, data });
          messageState(messageStore.getState());
        }}
      ></MessageContent>
      <MessagePublish
        releaseMessage={(data: messageType) => {
          messageStore.dispatch({ type: ADD, data });
          messageState(messageStore.getState());
        }}
      ></MessagePublish>
    </Board>
  );
});
