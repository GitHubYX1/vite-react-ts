import styled from "styled-components";

export const LookArchives = styled.div`
  max-width: 1200px;
  margin: 30px auto;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  border-radius: 3px;
  overflow-x: auto;
  .archives_top {
    font-size: 15px;
    font-weight: 700;
    color: #606266;
    padding-bottom: 20px;
    .archives_screen {
      width: 85%;
      .el-input {
        width: 250px;
        margin: 0 10px;
      }
      .el-select {
        width: 100px;
        margin: 0 10px;
      }
    }
  }
`;

export const Message = styled.div`
  button {
    border-radius: 5px;
  }
`;
