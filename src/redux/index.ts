//引入createStore，专门用于创建redux中最核心的store对象
import { createStore } from "redux";
// 应用data组件服务reducer
import dataStacte from "./data_state";
import messageStacte from "./message_stacte";
import chatStacte from "./chat_state";

export const store = createStore(dataStacte);
export const messageStore = createStore(messageStacte);
export const chatStore = createStore(chatStacte);
