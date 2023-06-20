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
    background: #f5f5f5;
    .dialogue-time {
      text-align: center;
      span {
        background: #dadada;
        color: #fff;
        border-radius: 4px;
        padding: 4px 5px;
        font-size: 14px;
      }
    }
    .chat-right {
      width: 80%;
      height: 100%;
      float: right;
      background: #f5f5f5;
      .chat-dialogue {
        height: 60%;
        overflow-x: hidden;
        overflow-y: scroll;
        /* 设置滚动条的样式 */
        ::-webkit-scrollbar {
          width: 3px;
          height: 3px;
        }

        /* 滚动槽 */
        ::-webkit-scrollbar-track {
          border-radius: 10px;
        }

        /* 滚动条滑块 */
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
`;
// 用户框
export const ChatList = styled.div`
  height: 100%;
  width: 20%;
  border-right: 1px solid #d3d3d3;
  float: left;
  background: #e6e5e5;
  .user-item {
    padding: 10px 20px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      background: #dedbdb;
    }
    .user-data {
      padding-left: 10px;
      width: calc(100% - 40px);
      .user-text {
        width: 100%;
        color: #999999;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .user-select {
    background: #c9c7c6;
  }
`;
// 对话框
export const DialogueBox = styled.div`
  width: 100%;

  .dialogue-item {
    padding: 5px;
    .dialogue-user {
      margin-top: 15px;
    }
    .dialogue-data {
      padding: 0 10px;
    }
    .dialogue-name {
      color: #b2b2b2;
      font-size: 14px;
    }

    .dialogue-content {
      padding: 5px 10px;
      border-radius: 4px;
      max-width: 500px;
      position: relative;
      white-space: pre-wrap;
      &:before {
        content: "";
        position: absolute;
      }
      .dialogue-img {
        max-width: 400px;
        margin-top: 5px;
        margin-bottom: 10px;
        &:last-child {
          margin-bottom: 5px;
        }
      }
    }
    .dialogue-right {
      display: flex;
      justify-content: flex-end;
      .dialogue-name {
        text-align: right;
      }
      .dialogue-content {
        background: #95ec69;
        &:before {
          border-top: 7px solid transparent !important;
          border-bottom: 7px solid transparent !important;
          border-left: 7px solid #95ec69 !important;
          right: -6px !important;
        }
      }
    }
    .dialogue-left {
      display: flex;
      .dialogue-content {
        background: #fff;
        &:before {
          border-top: 7px solid transparent !important;
          border-bottom: 7px solid transparent !important;
          border-right: 7px solid #fff !important;
          left: -6px !important;
        }
      }
    }
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
  .list-icon {
    .icon {
      padding-left: 20px;
    }
  }
`;
