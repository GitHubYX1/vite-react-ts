import { lazy } from "react";
import { Redirect } from "react-router";

const routes = [
  {
    path: "/",
    exact: true,
    render: () => {
      return <Redirect to="/home"></Redirect>;
    },
  },
  {
    path: "/home",
    component: lazy(() => import("../pages/home")),
  },
  {
    path: "/text",
    component: lazy(() => import("../pages/text")),
  },
  {
    path: "/archives",
    component: lazy(() => import("../pages/archives")),
  },
  {
    path: "/messageBoard",
    component: lazy(() => import("../pages/messageBoard")),
  },
  {
    path: "/chat",
    component: lazy(() => import("../pages/chat")),
  },
  {
    path: "/topicStep",
    component: lazy(() => import("../pages/topicStep")),
  },
  {
    path: "/ticTacToe",
    component: lazy(() => import("../pages/ticTacToe")),
  },
];

export default routes;
