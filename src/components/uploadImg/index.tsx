import { Tooltip } from 'antd';
import ReactFileReader from "react-file-reader";
import { PictureOutlined } from "@ant-design/icons";

interface uploadType {
  multipleFiles: Boolean;
  base64: Function;
}

export default function UploadImg(props: uploadType) {
  return (
    <div className="icon">
      <ReactFileReader
        fileTypes={[".png", ".jpg", ".gif", ".jpeg"]}
        base64={true}
        multipleFiles={props.multipleFiles}
        handleFiles={(e: any) => {
          props.base64(e.base64);
        }}
      >
        <Tooltip placement="bottom" title="发送图片"><PictureOutlined /></Tooltip>
      </ReactFileReader>
    </div>
  );
}

UploadImg.defaultProps = {
  multipleFiles: false,
};
