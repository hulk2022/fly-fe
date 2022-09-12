import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { init } from "~/common/init";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/dist/locale/zh-cn";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { basename } from "./common/const";
import KeepAliveLayout from "./common/components/KeepAliveLayout";

moment.locale("zh-cn");

init();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter basename={basename}>
      <KeepAliveLayout keepalive={["/", "/home"]}>
        <App />
      </KeepAliveLayout>
    </BrowserRouter>
  </ConfigProvider>
);
