// 工作经历
export declare type undergoType = {
  key: string;
  startTime: string;
  endTime: string;
  unit: string;
  position: string;
};
// 档案数据
export declare type archiverType = {
  address: string;
  birthday: string;
  department: string;
  education: number | string;
  id: string;
  idCard: string;
  marriage: number | string;
  name: string;
  number: string;
  phone: string;
  position: string;
  sex: string;
  undergo: undergoType[];
};
//查询
export declare type inquiryType = {
  keyword: string;
  education: number | string;
  department: string;
  position: string;
};

// 留言板
export declare type messageType = {
  id: string;
  name: string;
  comments: string;
  time: string;
  agree: number;
};
