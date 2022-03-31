import styled from "styled-components";

export const TextSearch = styled.div`
  width: 500px;
  margin: 0 auto;
  h2 {
    text-align: center;
    margin: 20px 0;
  }
  .search-input {
    text-align: center;
    margin: 20px 0;
    display: flex;
    input {
      margin: 0 20px;
    }
  }
  .search-text {
    width: 100%;
    height: 500px;
    border-radius: 5px;
    border: 1px solid #000;
    overflow-x: hidden;
    overflow-y: scroll;
    text-indent: 2em;
    .keyword {
      color: red;
    }
  }
`;

export const SearchList = styled.div`
  margin: 20px 0;
`;
