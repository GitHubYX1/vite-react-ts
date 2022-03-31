import { memo } from "react";
import { messageType } from "../../../types";
import { Empty, Button, Modal } from "antd";
import { LikeOutlined } from "@ant-design/icons";
import { Content } from "../messageCss";

interface contentType {
  data: messageType[];
  agreeClick: Function;
  dispatch: Function;
}

export default memo(function MessageContent(props: contentType) {
  return (
    <Content>
      <h3>留言信息（{props.data.length}）条</h3>
      {props.data.length ? (
        props.data.map((item, index) => (
          <div className="content-item" key={item.id}>
            <div className="content-top flex flex_between">
              {item.name} <span>{item.time}</span>
            </div>
            <div className="content-comments">{item.comments}</div>
            <div className="content-topic flex align_items flex_between">
              <div
                className="comment-topic-agree"
                onClick={() => {
                  props.agreeClick(index);
                }}
              >
                <LikeOutlined />
                赞同
                {item.agree !== 0 ? <i>{item.agree}</i> : ""}
              </div>
              <Button
                danger
                type="text"
                onClick={() => {
                  Modal.confirm({
                    title: "是否删除该留言？",
                    okText: "确认",
                    cancelText: "取消",
                    onOk: () => {
                      props.dispatch(item);
                    },
                  });
                }}
              >
                删除
              </Button>
            </div>
          </div>
        ))
      ) : (
        <Empty style={{ color: "#bfbfbf" }} description="暂无留言" />
      )}
    </Content>
  );
});
