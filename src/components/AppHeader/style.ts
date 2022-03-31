import styled from "styled-components";

export const HeaderWrapper = styled.div`
  height: 8vh;
  line-height: 8vh;
  font-size: 14px;
  background-color: #404040;
  color: #fff;
  .content {
    display: flex;
    justify-content: space-between;
    .select-list {
      display: flex;
      line-height: 8vh;
      .select-item {
        position: relative;
        a {
          display: block;
          padding: 0 30px;
          color: #ccc;
          font-size: 20px;
          text-decoration: none;
        }

        &:hover a,
        a.active {
          color: #fff;
          background: #2ca7e3;
        }
      }
    }
  }
`;
