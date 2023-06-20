import styled from "styled-components";

export const EmojiData = styled.div`
  position: relative;
  .emoji-picker {
    position: absolute;
    bottom: 40px;
    left: -162px;
    padding: 12px 16px;
    background: #fff;
    border-radius: 5px;
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
