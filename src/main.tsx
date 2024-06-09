"use client";
import React, { useEffect, useState } from "react";
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
  QqOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import "./App.scss";
import TracksPage from "./app/tracks/page.tsx";

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
    label: <Link to="/users">Manager Tracks</Link>,
    key: "/tracks",
    icon: <QqOutlined />,
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
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <TracksPage />
    </>
  );
};

// 1 layout lớn bên ngoài
const LayoutAdmin = () => {
  const getData = async () => {
    // LƯU LAI ACCESS_TOKEN ĐỂ SỬ DỤNG CHO NHIỀU LẦN - LÀM BEARE GẮN VÀO HEADER
    const res = await fetch("http://localhost:8000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "admin@gmail.com",
        password: "123456",
      }),
    });
    const d = await res.json();
    console.log("data", d);

    if (d.data) {
      localStorage.setItem("access_token", d.data.access_token);
    }
  };
  // TỰ ĐONG BẮN API LOOGIN ĐỂ LẤY TOKEN MỚI RỒI SAVE VÀO LOCALSTORAGE CỦA BROWSER
  useEffect(() => {
    getData();
  }, []);

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
