import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { init } from "~/common/init";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { basename } from "./common/const";
import KeepAliveLayout from "./common/components/KeepAliveLayout";
import zhCN from "@arco-design/web-react/es/locale/zh-CN";
import ConfigProvider from "@arco-design/web-react/es/ConfigProvider";

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
