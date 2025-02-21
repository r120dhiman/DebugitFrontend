import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Api/Context.jsx";
import { Layout, Menu, Button, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const { loginData, logout } = useUser();
  const navigate = useNavigate();
  const [current, setCurrent] = useState("home");

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Layout.Header className="p-0 sticky top-0 z-[1] w-full bg-[#001529]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center w-full">
            <Link to="/">
              <h1 className="text-white text-xl font-bold w-40 m-0">
                Civic Portal
              </h1>
            </Link>

            <div className="flex w-full flex-row gap-20">
              <Link to="/" className="text-white hover:text-2xl">Home</Link>
              <Link to="/vote" className="text-white hover:text-2xl">Vote</Link>
              {loginData && (
                <>
                  <Link to="/report" className="text-white hover:text-2xl">Report</Link>
                  <Link to="/newpoll" className="text-white hover:text-2xl">Create Poll</Link>
                </>
              )}
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Menu
              theme="dark"
              mode="horizontal"
              selectedKeys={[current]}
              onClick={handleMenuClick}
              className="bg-none border-b-none flex items-center"
            >
              {loginData && (
                <>
                  <Menu.Item
                    key="logout"
                    icon={<LogoutOutlined />}
                    danger
                    onClick={handleLogout}
                  >
                    Logout
                  </Menu.Item>
                </>
              )}
            </Menu>

            {loginData ? (
              <div className="flex items-center space-x-3">
                <Avatar icon={<UserOutlined />} />
                <Link to='/profile'>
                <span className="text-white text-sm">
                  {loginData.first_name || "User"}
                </span>
                </Link>
               
              </div>
            ) : (
              <>
                <Button
                  type="link"
                  icon={<LoginOutlined />}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  onClick={() => navigate("/signup")}
                >
                  Signup
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Button
              type="text"
              icon={<MenuOutlined className="text-white text-2xl" />}
            />
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Navbar;
