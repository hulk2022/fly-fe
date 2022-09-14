import { lazy } from "react";

const Home = lazy(() => import("../pages/Home"));
const Data = lazy(() => import("../pages/Data"));
const User = lazy(() => import("../pages/User"));

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/data",
    element: <Data />,
  },
  {
    path: "/user",
    element: <User />,
  },
];

export default routes;
