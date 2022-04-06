import styled from "styled-components";
// 聊天整体
export const ChatData = styled.div`
  width: 1200px;
  margin: 0 auto;

  h2 {
    font-weight: 700;
    margin: 30px 0;
    text-align: center;
  }
  .chat-box {
    height: 600px;
    border: 1px solid #d3d3d3;
    border-radius: 5px;
    overflow: hidden;
    .chat-right {
      width: 80%;
      height: 100%;
      float: right;
      background: #f5f5f5;
    }
  }
`;
// 用户框
export const ChatList = styled.div`
  height: 100%;
  width: 20%;
  border-right: 1px solid #d3d3d3;
  float: left;
  background: #e9e7e6;
  .user-item {
    padding: 10px 20px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background: #dedbdb;
    }
    .user-text {
      padding-left: 10px;
      width: calc(100% - 40px);
    }
  }
  .user-select {
    background: #c9c7c6;
  }
`;
// 对话框
export const DialogueBox = styled.div`
  width: 100%;
  height: 60%;
  overflow-x: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }
  .chat-item {
    padding: 5px;
    display: flex;
  }
`;

// 输入框
export const InputBox = styled.div`
  width: 100%;
  height: 40%;
  border-top: 1px solid #d3d3d3;
  .input-send {
    padding: 10px;
    text-align: right;
  }
`;
