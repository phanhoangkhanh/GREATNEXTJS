import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import UserPage from "./screens/users.page.tsx";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./App.scss";

// PHẦN HEADER THEO ANT
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: <Link to="/">Home</Link>,
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">Manager User</Link>,
    key: "/users",
    icon: <UserOutlined />,
  },
  {
    label: <Link to="/test">Test</Link>,
    key: "test",
    icon: <AppstoreOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState("home");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

// 1 layout lớn bên ngoài
const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      {/* nơi chứa tất cả thành phần còn - giong children */}
      <Outlet />
      <footer>FOOTER NÈ</footer>
    </div>
  );
};

const TestPage = () => {
  return <>testing thui nè</>;
};
//Nơi phẩn bổ url và component tuong ứng
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UserPage />,
      },
    ],
  },
  {
    path: "/test",
    element: <TestPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
