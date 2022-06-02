import styled from "styled-components";

export const Step = styled.div`
  width: 1200px;
  margin: 0 auto;
  h2 {
    font-weight: 700;
    margin: 30px 0;
    text-align: center;
  }
  .question-list {
    margin-top: 30px;
  }
  .question-card {
    margin-bottom: 30px;
  }
  .question-title {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 20px;
    padding: 5px;
    background-color: #ededed;
    .icon {
      color: #fed136;
      font-size: 24px;
      margin-right: 10px;
    }
    span {
      color: #999999;
    }
  }
`;
