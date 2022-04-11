import ReactFileReader from "react-file-reader";
import { PictureOutlined } from "@ant-design/icons";
import { UploadBox } from "./uploadCss";

interface uploadType {
  multipleFiles: Boolean;
  base64: Function;
}

export default function UploadImg(props: uploadType) {
  return (
    <UploadBox>
      <ReactFileReader
        fileTypes={[".png", ".jpg", ".gif", ".jpeg"]}
        base64={true}
        multipleFiles={props.multipleFiles}
        handleFiles={(e: any) => {
          props.base64(e.base64);
        }}
      >
        <span className="upload-icon">
          <PictureOutlined />
        </span>
      </ReactFileReader>
    </UploadBox>
  );
}

UploadImg.defaultProps = {
  multipleFiles: false,
};
