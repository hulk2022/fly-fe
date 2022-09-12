import { Spin } from "antd";
import { Suspense } from "react";
import { useLayoutEffect } from "react";
import { useRoutes } from "react-router-dom";

import useUserStore from "~/common/hooks/useUserStore";
import styles from "./App.module.css";
import routes from "./common/routes";

function App() {
  const elements = useRoutes(routes);
  const { currUser, fetchUser } = useUserStore((state) => ({
    currUser: state.current,
    fetchUser: state.fetch,
  }));

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  if (!currUser) {
    return <Spin>加载中...</Spin>;
  }

  return (
    <Suspense fallback={<Spin>努力加载中...</Spin>}>
      <div className={styles.wrapper}>{elements}</div>
    </Suspense>
  );
}

export default App;
