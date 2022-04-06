import { memo, useState } from "react";
import { InputBox } from "../chatCss";
import { Input, Button, message } from "antd";
import { chatUser } from "../../../common/local-data";
import shortId from "shortid";
import { chatType } from "../../../types";

const { TextArea } = Input;

interface inputType {
  id: string;
  sendData: Function;
}

export default memo(function InputIndex(props: inputType) {
  const [discuss, discussState] = useState("");
  //发送数据
  const sendClick = () => {
    if (!props.id) {
      return message.info("请选择账号！");
    }
    if (!discuss) {
      return message.info("请输入信息！");
    }
    let user = chatUser.find((item) => item.id == props.id);
    props.sendData({
      id: shortId.generate(),
      userId: user?.id,
      userName: user?.name,
      userAvatar: user?.avatar,
      text: discuss,
      time: new Date().getTime(),
    });
    discussState("");
  };
  return (
    <InputBox>
      <TextArea
        placeholder="请输入信息"
        value={discuss}
        autoSize={{ minRows: 8 }}
        bordered={false}
        onChange={(e) => discussState(e.target.value)}
      />
      <div className="input-send">
        <Button onClick={sendClick}>发送</Button>
      </div>
    </InputBox>
  );
});
