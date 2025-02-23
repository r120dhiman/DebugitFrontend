import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../Api/Context.jsx";
import { Layout, Button, Avatar } from "antd";
import {
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const { loginData, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setMobileMenuVisible(false);
  };

  return (
    <Layout.Header className="p-0 sticky top-0 z-50 w-full bg-[#001529]">
      <div className="flex justify-between items-center h-16 px-4">
        <Link to="/">
          <h1 className="text-white text-xl font-bold m-0">Civic Portal</h1>
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-white px-3">Home</Link>
          <Link to="/vote" className="text-white px-3">Give Your Opinion</Link>
          {loginData && (
            <>
              <Link to="/report" className="text-white px-3">Report</Link>
              <Link to="/newpoll" className="text-white px-3">Create Poll</Link>
            </>
          )}
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {loginData ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="flex items-center space-x-2">
                <Avatar icon={<UserOutlined />} />
                <span className="text-white text-sm">
                  {loginData.first_name || "User"}
                </span>
              </Link>
              <Button 
                type="text" 
                className="filter invert text-white" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Button
                type="link"
                icon={<LoginOutlined />}
                onClick={() => navigate("/login")}
                className="text-white"
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
            icon={<MenuOutlined className= " filter invert text-white text-lg" />}
            onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
            className="text-white"
          />
        </div>
      </div>
      {mobileMenuVisible && (
        <div className="md:hidden bg-[#001529] py-4 px-4 space-y-3">
          <Link to="/" className="block text-white py-2" onClick={() => setMobileMenuVisible(false)}>Home</Link>
          <Link to="/vote" className="block text-white py-2" onClick={() => setMobileMenuVisible(false)}>Give Your Opinion</Link>
          
          {loginData ? (
            <>
              <Link to="/report" className="block text-white py-2" onClick={() => setMobileMenuVisible(false)}>Report</Link>
              <Link to="/newpoll" className="block text-white py-2" onClick={() => setMobileMenuVisible(false)}>Create Poll</Link>
              <Link to="/profile" className="block text-white py-2" onClick={() => setMobileMenuVisible(false)}>Profile</Link>
              <Button 
                type="text" 
                className="block text-white py-2 w-full text-left" 
                onClick={handleLogout}
                style={{color:'white'}}
              >
                Logout
              </Button>
            </>
          ) : (
            <div className="flex flex-col space-y-2 pt-2">
              <Button
                type="primary"
                onClick={() => {
                  navigate("/login");
                  setMobileMenuVisible(false);
                }}
              >
                Login
              </Button>
              <Button
                onClick={() => {
                  navigate("/signup");
                  setMobileMenuVisible(false);
                }}
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      )}
    </Layout.Header>
  );
};

export default Navbar;