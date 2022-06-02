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

export declare type LastType = number | "";
// 聊天
export declare type chatType = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  text: string;
  time: number;
  lastTime: LastType;
  imageUrl?: string[];
};

/** 问题进度 **/

/**
 * 选项答案
 * @param content 选项名称
 * @param count 计数
 * @param ratio 占比
 */
export declare type answerType = {
  content: string;
  count: number;
  ratio: string;
};

/**
 * 填空题答案
 * @param id id
 * @param content 填空数据
 * @param time 时间
 */
export declare type fillAnswerType = {
  id: number;
  content: string;
  time: string;
};

/**
 * 题目数据
 * @param questionContent 题目
 * @param id id
 * @param type 状态
 * @param answer 选项答案
 * @param assessCount 总计
 * @param fillAnswer 填空数据
 */
export declare type questionType = {
  questionContent: string;
  id: number;
  type: string;
  answer: answerType[];
  assessCount: number;
  fillAnswer?: fillAnswerType[];
};
