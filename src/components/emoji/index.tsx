import { memo, useState, useRef } from "react";
import { Tooltip } from 'antd';
import { SmileOutlined } from "@ant-design/icons";
import { EmojiData } from "./emojiCss";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default memo(function Emoji(props: { onEmoji: Function }) {
  const [visible, visibleState] = useState(false);
  const [cartoon, cartoonState] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  const i18n = {
    search: "搜索",
    clear: "清除",
    notfound: "未找到表情符号",
    skintext: "选择默认肤色",
    categories: {
      search: "搜索结果",
      recent: "经常使用",
      smileys: "微笑&情感",
      people: "人物&身体",
      nature: "动物&自然",
      foods: "食品&饮料",
      activity: "活动",
      places: "旅行&地点",
      objects: "对象",
      symbols: "符号",
      flags: "旗帜",
      custom: "习惯",
    },
    categorieslabel: "表情符号类别",
    skintones: {
      1: "默认肤色",
      2: "浅肤色",
      3: "中浅肤色",
      4: "中等肤色",
      5: "中深色肤色",
      6: "深色肤色",
    },
  };
  const onEmojiClick = (emoji: any) => {
    props.onEmoji(emoji.native);
    visibleState(!visible);
  };
  const handleClick = (br: boolean) => {
    if (br) {
      // 添加全局点击事件
      document.addEventListener("click", handleOutsideClick, false);
    } else {
      document.removeEventListener("click", handleOutsideClick, false);
    }
    // 判断是否开启关闭动画
    if (!br) {
      cartoonState(true);
      setTimeout(() => {
        visibleState(false);
        cartoonState(false);
      }, 500);
    } else {
      visibleState(true);
    }
  };
  // 判断是否点击了myRef.current的区域
  const handleOutsideClick = (e: any) => {
    console.log(e);
    if (!myRef.current?.contains(e.target)) handleClick(false);
  };
  return (
    <EmojiData ref={myRef} className="icon">
      <div
        className={"emoji-picker " + (!cartoon ? "entry" : "quit")}
        style={{ display: visible ? "block" : "none" }}
      >
        <Picker
          onSelect={onEmojiClick}
          i18n={i18n}
          showPreview={false}
          showSkinTones={false}
          set="google"
          autoFocus
          enableFrequentEmojiSort
        />
      </div>
      <Tooltip placement="bottom" title="表情"><SmileOutlined onClick={() => { handleClick(!visible); }} /></Tooltip>
    </EmojiData>
  );
});
