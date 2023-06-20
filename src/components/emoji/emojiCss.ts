import styled from "styled-components";

export const EmojiData = styled.div`
  position: relative;
  .emoji-picker {
    position: absolute;
    bottom: 40px;
    left: -146px;
    border-radius: 5px;
    box-shadow: 0px 0cap 16px 4px rgba(0,0,0,0.43);
    -webkit-box-shadow: 0px 0px 16px 4px rgba(0,0,0,0.43);
    -moz-box-shadow: 0px 0px 16px 4px rgba(0,0,0,0.43);
    &:before {
      content: "";
      position: absolute;
      border-top: 8px solid #fff !important;
      border-bottom: 8px solid transparent !important;
      border-left: 8px solid transparent !important;
      border-right: 8px solid transparent !important;
      bottom: -16px !important;
      left: 50%;
      transform: translate(-50%, 0);
    }
    .emoji-mart{
      display:block;
      border:0;
      overflow: hidden;
    }
  }
  .entry {
    animation: scaleDraw 0.5s;
    @keyframes scaleDraw {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
  .quit {
    animation: quitScale 0.5s;
    @keyframes quitScale {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  }
`;
