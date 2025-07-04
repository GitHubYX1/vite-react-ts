import styled from "styled-components";

export const MergeContainer = styled.div`
  width: 200px;
  margin: 40px auto;
  .merge-title {
    text-align: center;
    font-size: 16px;
    font-weight: normal;
  }
  .upload-file {
    position: relative;
  }
  .upload-input {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
  }
  .merge-progress{
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
  }
`;
