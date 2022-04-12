import { memo, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { EmojiData } from "./emojiCss";
import { Popover } from "antd";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

export default memo(function Emoji(props: { onEmoji: Function }) {
  const i18n = {
    search: "搜索",
    clear: "清除", // Accessible label on "clear" button
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
    categorieslabel: "表情符号类别", // Accessible title for the list of categories
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
  };
  return (
    <EmojiData>
      <Popover
        placement="top"
        trigger="click"
        content={
          <Picker
            onSelect={onEmojiClick}
            i18n={i18n}
            showPreview={false}
            showSkinTones={false}
            set="google"
            autoFocus
            enableFrequentEmojiSort
          />
        }
      >
        <span className="emoji-icon">
          <SmileOutlined />
        </span>
      </Popover>
    </EmojiData>
  );
});
