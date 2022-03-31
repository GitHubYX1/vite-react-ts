import styled from "styled-components";

export const Board = styled.div`
  width: 1000px;
  margin: 0 auto;

  h2 {
    font-weight: 700;
    margin: 30px 0;
    text-align: center;
  }
`;

export const Publish = styled.div`
  padding: 20px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  h3 {
    margin-bottom: 20px;
  }
  .publish-comment {
    margin-bottom: 20px;
    span {
      padding-left: 10px;
      color: #808080;
    }
  }
`;

export const Content = styled.div`
  margin-bottom: 30px;
  h3 {
    padding: 10px 0;
    border-bottom: 1px solid #d3d3d3;
    margin-bottom: 10px;
  }
  .content-item {
    padding: 10px 20px;
    border-bottom: 1px dashed #d3d3d3;
    .content-top {
      margin-bottom: 10px;
    }
    .content-comments {
      white-space: pre-wrap;
    }
    .content-topic {
      margin-top: 10px;
      .comment-topic-agree {
        padding: 0 10px;
        line-height: 30px;
        background: #f5f5f5;
        border-radius: 4px;
        color: #576b95;
        cursor: pointer;
        span {
          padding-right: 5px;
        }
        i {
          font-style: normal;
          padding-left: 5px;
        }
      }
    }
  }
`;
