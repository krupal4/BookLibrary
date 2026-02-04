import React, { useEffect, useState } from "react";
import {
  BookFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, message, theme } from "antd";
import BooksPage from "~/pages/BooksPage";
import CategoriesPage from "../pages/CategoriesPage";
import { Navigate } from "react-router";
import { AxiosHelper } from "~/common/AxiosHelper";
import { authLoader } from "~/common/authLoader";

enum MenuKey {
  Books = "1",
  Categories = "2",
  Search = "3",
  Logout = "4",
}
const { Header, Sider, Content } = Layout;

const DashboardPage: React.FC = () => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const [hasAuthError, setHasAuthError] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<MenuKey>(MenuKey.Books);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const runAuthCheck = async () => {
      try {
        await authLoader();
      } catch (e: any) {
        setHasAuthError(true);
        message.error(e?.message ?? "Not Logged In!");
      } finally {
        setAuthLoaded(true);
      }
    };

    runAuthCheck();
  }, []);

  if (!authLoaded) {
    return <div>Loading...</div>;
  }

  if (hasAuthError) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ height: "88vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          height: "100%",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={(e) => setSelectedKey(e.key as MenuKey)}
          items={[
            { key: MenuKey.Books, icon: <BookFilled />, label: "Books" },
            {
              key: MenuKey.Categories,
              icon: <VideoCameraOutlined />,
              label: "Categories",
            },
            {
              key: MenuKey.Search,
              icon: <SearchOutlined />,
              label: "Search",
            },
            { key: MenuKey.Logout, icon: <UserOutlined />, label: "Logout" },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            height: '64px',
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 16, width: 64, height: 64 }}
          />
          <div style={{ fontSize: 20 }}>Book Library</div>
        </Header>

        <Content
          style={{
            margin: "16px 12px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
            padding: '8px',
            height: "calc(100% - 64px)",
          }}
        >
          {
            {
              [MenuKey.Books]: () => <BooksPage />,
              [MenuKey.Categories]: () => <CategoriesPage />,
              [MenuKey.Search]: () => <div>Search Screen</div>,
              [MenuKey.Logout]: () => {
                AxiosHelper.eraseJwtToken();
                return <Navigate to="/login" replace />
              },
            }[selectedKey]()
          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;