import { memo, useState } from "react";
import { Modal, Avatar, Image, Empty, Input, Tooltip } from 'antd';
import { MessageOutlined, SearchOutlined } from "@ant-design/icons";
import { chatStore } from "../../../redux";
import { chatType } from "../../../types";
import { offTime } from "../../../utils";
import { HistoryList } from "../chatCss"

export default memo(function ChatHistory() {
  let [modalOpen, modalOpenState] = useState(false);
  let [chat, chatState] = useState<chatType[]>(chatStore.getState());
  let [search, searchState] = useState('')
  const searchClick = () => {
    let dataList: chatType[] = []
    let chatData: chatType[] = chat
    if (search) {
      for (let i in chatData) {
        chatData[i].text = chatData[i].text.replace(/<[^>]+>/g, ""); //去除文本中的html标签
        if (chatData[i].text.indexOf(search) !== -1) {
          chatData[i].text = chatData[i].text.replace(
            new RegExp(search, "gm"),
            `<span class="keyword">${search}</span>`
          ); //将关键词高亮
          dataList.push(chatData[i])
        }
      }
      chatState(dataList)
    } else {
      chatState(JSON.parse(JSON.stringify(chatStore.getState())))
    }

  }
  const showModal = () => {
    modalOpenState(true);
    chatState(JSON.parse(JSON.stringify(chatStore.getState())));
    searchState('')
  };
  const handleCancel = () => {
    chatState([])
    modalOpenState(false);
  };
  return (
    <div className="icon">
      <Tooltip placement="bottom" title="对话记录" zIndex={1}><MessageOutlined onClick={showModal} /></Tooltip>
      <Modal title="对话记录" width={600} visible={modalOpen} onOk={handleCancel} onCancel={handleCancel} footer={''}>
        <Input prefix={<SearchOutlined twoToneColor="#b2b2b2" />} placeholder="搜索" value={search}
          onChange={(e) => { searchState(e.target.value) }} onPressEnter={searchClick}></Input>
        <HistoryList>
          {chat.length ? chat.map(item => (
            <div className="history-item" key={item.id}>
              <Avatar src={item.userAvatar} size={40}></Avatar>
              <div className="history-data">
                <div className="history-name">
                  <span>{item.userName}</span>
                  <span>{offTime(Number(item.time))}</span>
                </div>
                <div className="history-content">
                  {!item.imageUrl?.length
                    ? <div dangerouslySetInnerHTML={{ __html: item.text }}></div>
                    : item.imageUrl.map((url, index) => {
                      return (
                        <div className="history-img" key={index}>
                          <Image src={url} />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ))
            : <Empty description={'无搜索结果'} />
          }
        </HistoryList>
      </Modal>
    </div>
  );
});
