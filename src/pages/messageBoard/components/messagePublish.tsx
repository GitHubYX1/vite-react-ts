import { memo, useState } from "react";
import { Input, Button, message } from "antd";
import { Publish } from "../messageCss";
import shortId from "shortid";
import Emoji from "../../../components/emoji";

const { TextArea } = Input;

export default memo(function messagePublish(props: {
  releaseMessage: Function;
}) {
  const discussInit = {
    name: "",
    comments: "",
  };
  const [discuss, discussState] = useState(discussInit);
  // 获取调查数据
  const saveQuery = (value: string, key: string) => {
    discussState({ ...discuss, [key]: value });
  };
  //发布消息
  const release = () => {
    if (!discuss.name) {
      return message.info("请输入您的姓名");
    }
    if (!discuss.comments) {
      return message.info("请输入留言信息");
    }
    let time = new Date();
    props.releaseMessage({
      id: shortId.generate(),
      name: discuss.name,
      comments: discuss.comments,
      time: time.toLocaleString().replace(/\//gi, "-"), //获取当前时间
      agree: 0,
    });
    discussState(discussInit);
  };
  return (
    <Publish>
      <h3>我要发表看法</h3>
      <div className="publish-comment flex align_items">
        <Input
          placeholder="请输入您的姓名"
          value={discuss.name}
          style={{ width: 300 }}
          onChange={(e) => saveQuery(e.target.value, "name")}
        />
        <span>«-必填</span>
      </div>
      <div className="publish-comment">
        <TextArea
          placeholder="请输入留言信息"
          value={discuss.comments}
          autoSize={{ minRows: 4 }}
          onChange={(e) => saveQuery(e.target.value, "comments")}
        />
      </div>
      <div className="publish-operate">
        <Emoji onEmoji={(e: string) => { saveQuery(discuss.comments + e, "comments") }}></Emoji>
        <Button type="primary" onClick={release}>
          发布
        </Button>
      </div>
    </Publish>
  );
});
