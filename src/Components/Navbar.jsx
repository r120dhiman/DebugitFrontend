import React, { useState, useEffect } from "react";
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
import gsap from "gsap";
const Navbar = () => {
  let tl = gsap.timeline();
  useEffect(() => {
    tl.fromTo(
      ".navoption",
      {
        x: -10,
        y: -20,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
      }
    );
  }, []);
  const handlehover = (event) => {
    gsap.to(event.currentTarget, {
      borderBottomWidth: 2,
      duration: 0.3,
      borderBottomColor: "white",
    });
  };
  const handleout = (event) => {
    gsap.to(event.currentTarget, {
      borderBottomWidth: 0,
    });
  };
  const { loginData, logout } = useUser();
  console.log(loginData);
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
    <Layout.Header className=" p-0 sticky top-0 z-[1] w-full  h-20  bg-[#001529]">
        <div className="flex justify-between items-center h-12 pt-2 ">
          <div className="flex items-center w-full ">
            <Link to="/">
              <h1 className="text-white text-xl font-bold w-40 m-0">
                Civic Portal
              </h1>
            </Link>

            <div className="flex w-full flex-row gap-20 h-full ">
              <Link
                to="/"
                onMouseEnter={(e) => {
                  handlehover(e);
                }}
                onMouseOut={(e) => {
                  handleout(e);
                }}
                className={`navoption text-white h-fit px-3 `}
              >
                Home
              </Link>
              <Link to="/vote"  onMouseEnter={(e) => {
                  handlehover(e);
                }}
                onMouseOut={(e) => {
                  handleout(e);
                }} className="navoption text-white px-3 ">
                Vote
              </Link>
              {loginData && (
                <>
                  <Link
                   onMouseEnter={(e) => {
                    handlehover(e);
                  }}
                  onMouseOut={(e) => {
                    handleout(e);
                  }}
                    to="/report"
                    className="navoption text-white px-3 "
                  >
                    Report
                  </Link>
                  <Link
                   onMouseEnter={(e) => {
                    handlehover(e);
                  }}
                  onMouseOut={(e) => {
                    handleout(e);
                  }}
                    to="/newpoll"
                    className="navoption text-white px-3 "
                  >
                    Create Poll
                  </Link>
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
                 <span onClick={handleLogout} className="navoption px-5 text-white text-lg">
                    Logout
                  </span>
                </>
              )}
            </Menu>

            {loginData ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex flex-row justify-center items-center gap-3">
                <Avatar icon={<UserOutlined />} />
                
                  <span className="navoption text-white text-sm">
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
    </Layout.Header>
  );
};

export default Navbar;
