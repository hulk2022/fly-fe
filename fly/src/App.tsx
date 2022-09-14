import { Layout, Menu, Spin } from "@arco-design/web-react";
import { Suspense, useState } from "react";
import { useLayoutEffect } from "react";
import { NavLink, useRoutes } from "react-router-dom";
import { IconHome, IconCalendar } from "@arco-design/web-react/icon";
import useUserStore from "~/common/hooks/useUserStore";
import styles from "./App.module.less";
import routes from "./common/routes";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Header = Layout.Header;
const Sider = Layout.Sider;
const Content = Layout.Content;
const collapsedWidth = 60;
const normalWidth = 220;

const menuConfig = [
  {
    name: "首页",
    path: "/home",
    icon: "custom-home",
  },
  {
    name: "战略地图",
    path: "/map",
    icon: "custom-zhanlve2x",
  },
];

function App() {
  const elements = useRoutes(routes);
  const { currUser, fetchUser } = useUserStore((state) => ({
    currUser: state.current,
    fetchUser: state.fetch,
  }));

  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [siderWidth, setSiderWidth] = useState<number>(normalWidth);

  useLayoutEffect(() => {
    fetchUser();
  }, []);

  if (!currUser) {
    return <Spin>加载中...</Spin>;
  }

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
    setSiderWidth(collapsed ? collapsedWidth : normalWidth);
  };

  const handleMoving = (
    _: MouseEvent,
    {
      width,
    }: {
      width: number;
      height: number;
    }
  ) => {
    if (width > collapsedWidth) {
      setSiderWidth(width);
      setCollapsed(!(width > collapsedWidth + 20));
    } else {
      setSiderWidth(collapsedWidth);
      setCollapsed(true);
    }
  };

  return (
    <Layout className={styles.wrapper}>
      <Sider
        collapsible
        theme="dark"
        onCollapse={onCollapse}
        collapsed={collapsed}
        width={siderWidth}
        resizeBoxProps={{
          directions: ["right"],
          onMoving: handleMoving,
        }}
      >
        <div className="logo" />
        <Menu theme="dark" autoOpen style={{ width: "100%" }}>
          <MenuItem key="1">
            <NavLink to="/home">
              <IconHome />
              应用管理
            </NavLink>
          </MenuItem>
          <MenuItem key="2">
            <NavLink to="/data">
              <IconCalendar />
              数据管理
            </NavLink>
          </MenuItem>
          <MenuItem key="3">
            <NavLink to="/user">
              <IconCalendar />
              用户管理
            </NavLink>
          </MenuItem>
          {/* <SubMenu
            key="layout"
            title={
              <span>
                <IconCalendar /> 布局组件
              </span>
            }
          >
            <MenuItem key="11">栅格</MenuItem>
            <MenuItem key="12">分隔符</MenuItem>
            <MenuItem key="13">布局</MenuItem>
          </SubMenu> */}
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ height: 60 }}>Header</Header>
        <Layout>
          <Content
            style={{
              background: "rgb(240,255,255)",
              textAlign: "center",
            }}
          >
            <div style={{ width: "100%", height: "100%" }}>
              <Suspense fallback={<Spin>努力加载中...</Spin>}>
                <div>{elements}</div>
              </Suspense>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default App;
