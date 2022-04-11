import { memo, useState } from "react";
import { InputBox } from "../chatCss";
import { Input, Button, message } from "antd";
import { chatUser } from "../../../common/local-data";
import shortId from "shortid";
import Emoji from "../../../components/emoji";
import UploadImg from "../../../components/uploadImg";

const { TextArea } = Input;

interface inputType {
  id: string;
  sendData: Function;
}

export default memo(function InputIndex(props: inputType) {
  const [discuss, discussState] = useState("");
  //发送数据
  const sendClick = (imageUrl: string[] = []) => {
    if (!props.id) {
      return message.info("请选择账号！");
    }
    if (!discuss && imageUrl.length == 0) {
      return message.info("请输入信息！");
    }
    let user = chatUser.find((item) => item.id == props.id);
    props.sendData({
      id: shortId.generate(),
      userId: user?.id,
      userName: user?.name,
      userAvatar: user?.avatar,
      text: imageUrl.length == 0 ? discuss : "",
      time: new Date().getTime(),
      lastTime: "",
      imageUrl,
    });
    if (imageUrl.length == 0) discussState("");
  };
  // 返回图片
  const onBase64 = (base: string[]) => {
    let imgList = base;
    if (base.length > 9) {
      imgList.slice(0, 9);
      message.info("图片最多一次上传9张！");
    }
    sendClick(imgList);
  };
  return (
    <InputBox>
      <div className="flex">
        <Emoji
          onEmoji={(e: string) => {
            discussState(discuss + e);
          }}
        ></Emoji>
        <UploadImg multipleFiles base64={onBase64}></UploadImg>
      </div>
      <TextArea
        placeholder="请输入信息"
        value={discuss}
        style={{ height: 150 }}
        bordered={false}
        onChange={(e) => {
          if (e.target.value != "\n") discussState(e.target.value);
        }}
        onPressEnter={(e) => {
          if (!e.shiftKey) sendClick();
        }}
      />
      <div className="input-send">
        <Button
          onClick={() => {
            sendClick();
          }}
        >
          发送
        </Button>
      </div>
    </InputBox>
  );
});
