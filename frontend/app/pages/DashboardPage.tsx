import React, { useState } from "react";
import {
  BookFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import BooksPage from "~/pages/BooksPage";
import CategoriesPage from "./CategoriesPage";
import AuthorsPage from "./AuthorsPage";
import { Navigate } from "react-router";
import Title from "antd/es/skeleton/Title";

enum MenuKey {
  Books = "1",
  Categories = "2",
  Search = "3",
  Logout = "4",
}
const { Header, Sider, Content } = Layout;

const DashboardPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<MenuKey>(MenuKey.Books);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
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
              [MenuKey.Books]: <BooksPage />,
              [MenuKey.Categories]: <CategoriesPage />,
              [MenuKey.Search]: <CategoriesPage />,
              [MenuKey.Logout]: <Navigate to="/login" replace />,
            }[selectedKey]
          }
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardPage;
