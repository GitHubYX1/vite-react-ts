import { memo, useState, useRef,useEffect } from "react";
import { Tooltip } from 'antd';
import { SmileOutlined } from "@ant-design/icons";
import { EmojiData } from "./emojiCss";
import data from "@emoji-mart/data";
import i18n from "@emoji-mart/data/i18n/zh.json";
import Picker from "@emoji-mart/react";

export default memo(function Emoji(props: { onEmoji: Function }) {
  const [visible, visibleState] = useState(false);
  const [cartoon, cartoonState] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);// 首次点击
  const onEmojiClick = (emoji: any) => {
    props.onEmoji(emoji.native);
    visibleState(!visible);
  };
  const handleClick = (br: boolean) => {
    //首次点击隐藏预览位置
    if (isFirst.current) {
      const myElement = document.querySelector("em-emoji-picker");
      if (myElement){
        const preview = myElement?.shadowRoot?.getElementById("preview");
        if (preview) {
          preview.style.display = "none";
          isFirst.current = false;
        }
      }
    }
    if (br) {
      visibleState(true);
    } else {
      // 判断是否开启关闭动画
      cartoonState(true);
      setTimeout(() => {
        visibleState(false);
        cartoonState(false);
      }, 500);
    }
  };
  // 判断是否点击了myRef.current的区域
  const handleOutsideClick = (e: any) => {
    if (!myRef.current?.contains(e.target)) handleClick(false);
  };
  useEffect(() => {
    // 点击emoji-picker 隐藏emoji-picker
    document.addEventListener("click", handleOutsideClick, false);
    return () => {
      document.removeEventListener("click", handleOutsideClick, false);
    };
  }, [visible]);
  return (
    <EmojiData ref={myRef} className="icon">
      <div
        className={"emoji-picker " + (!cartoon ? "entry" : "quit")}
        style={{ display: visible ? "block" : "none" }}
      >
        <Picker
          theme="light"
          searchPosition="none"
          locale="zh"
          autoFocus
          data={data}
          i18n={i18n}
          onEmojiSelect={onEmojiClick}
        />
      </div>
      <Tooltip placement="bottom" title="表情"><SmileOutlined onClick={() => { handleClick(!visible); }} /></Tooltip>
    </EmojiData>
  );
});
