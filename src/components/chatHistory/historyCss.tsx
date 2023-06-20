import styled from "styled-components";

export const HistoryList = styled.div`
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: scroll;
  width: 100%;
  padding-top: 20px;
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
  .history-item {
    padding: 10px 0;
    display: flex;
    .history-data {
      width: calc(100% - 45px);
      padding-left: 5px;
      border-bottom: 1px solid #ececec;
      .history-name {
        color: #b2b2b2;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }

      .history-content {
        border-radius: 4px;
        white-space: pre-wrap;
        padding-bottom: 10px;
        &:before {
          content: "";
          position: absolute;
        }
        .history-img {
          max-width: 200px;
        }
      }
    }
  }

  .keyword{
    color: #19ad19;
  }
`;
