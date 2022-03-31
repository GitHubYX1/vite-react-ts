import { memo, useRef, useState } from "react";
import { Button, Input } from "antd";
import { TextSearch } from "./textCss";
import { TextHtml } from "../../common/text";

export default memo(function Text() {
  const search = useRef<string | undefined>();
  let [html, htmState] = useState(TextHtml);
  const searchClick = () => {
    let value = search.current;
    let noLabel = TextHtml.replace(/<[^>]+>/g, ""); //去除文本中的html标签
    if (value && noLabel.indexOf(value) !== -1) {
      html = TextHtml.replace(
        new RegExp(value, "gm"),
        `<span class="keyword">${value}</span>`
      ); //将关键词高亮
    } else {
      html = TextHtml;
      if (value !== "") {
        alert("未搜索到关键词");
      }
    }
    htmState(html);
  };
  return (
    <TextSearch>
      <h2>文本搜索</h2>
      <div className="search-input">
        <Input
          ref={(elem) => {
            if (elem) search.current = elem.input?.value;
          }}
          onPressEnter={searchClick}
        />
        <Button type="primary" onClick={searchClick}>
          点击搜索
        </Button>
      </div>
      <div
        className="search-text"
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </TextSearch>
  );
});
