import { Layout } from "antd";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { GiHomeGarage, GiMicrochip, GiMoneyStack, GiTakeMyMoney } from "react-icons/gi";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoIosNotifications, IoMdPaper } from "react-icons/io";
import {
  TbDiscount,
  TbPlayFootball,
  TbUsers,
  TbUsersGroup,
} from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { CiLogout, CiSettings } from "react-icons/ci";
import { IoDocumentLockOutline, IoFootballOutline } from "react-icons/io5";
import { RiAdminLine, RiUser2Line } from "react-icons/ri";
import { useEffect, useMemo, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GoQuestion } from "react-icons/go";
import { BsExclamationCircle, BsPersonVideo3 } from "react-icons/bs";
import { MdOutlineCategory, MdOutlineWatchLater } from "react-icons/md";
import { PiCarProfile, PiVideo } from "react-icons/pi";
import logo from "../../assets/logoWithName.png";
import { useProfileQuery } from "../../redux/features/authApi";
import { imageUrl } from "../../redux/api/baseApi";
import { useGetNotificationsQuery } from "../../redux/features/notificationApi";
import { io } from "socket.io-client";
import { RxActivityLog } from "react-icons/rx";

const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data } = useProfileQuery();
  const user = data?.data;

  const { data: notificationData, refetch } = useGetNotificationsQuery();
  const unreadCount = useMemo(
    () => notificationData?.data?.unreadCount || 0,
    [notificationData]
  );

  const socket = useMemo(() => io(imageUrl), []);

  useEffect(() => {
    socket.on(`notification::${user?._id}`, (data) => {
      console.log(data);

      refetch();
    });
  }, [socket, user?._id]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const src =
    user?.image && user?.image.startsWith("http")
      ? user?.image
      : user?.image
      ? `${imageUrl}${user?.image}`
      : "/default-avatar.jpg";

  const linkItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: (pathname) => (
        <LuLayoutDashboard
          className={`text-xl ${
            pathname === "/" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Device Lists",
      path: "/device-lists",
      icon: (pathname) => (
        <GiMicrochip
          className={`text-xl ${
            pathname === "/device-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "User Lists",
      path: "/user-lists",
      icon: (pathname) => (
        <TbUsersGroup
          className={`text-xl ${
            pathname === "/user-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Vehicle Lists",
      path: "/student-lists",
      icon: (pathname) => (
        <PiCarProfile
          className={`text-xl ${
            pathname === "/student-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },
    {
      title: "Driver Lists",
      path: "/driver-lists",
      icon: (pathname) => (
        <TbUsers
          className={`text-xl ${
            pathname === "/driver-lists" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },

    {
      title: "Activity",
      path: "/sellings-details",
      icon: (pathname) => (
        <RxActivityLog
          className={`text-xl ${
            pathname === "/sellings-details"
              ? "text-[#EEEEEE]"
              : "text-[#A3A3A3]"
          }`}
        />
      ),
    },

    {
      title: "Garage History",
      path: "/products",
      icon: (pathname) => (
        <GiHomeGarage
          className={`text-xl ${
            pathname === "/products" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
    },

    {
      title: "Settings",
      path: "/settings",
      icon: (pathname) => (
        <CiSettings
          className={`text-xl ${
            pathname === "/subscription" ? "text-[#EEEEEE]" : "text-[#A3A3A3]"
          }`}
        />
      ),
      submenu: [
        {
          title: "About Us",
          path: "/settings/about-us",
          icon: (pathname) => (
            <BsExclamationCircle
              className={`text-xl ${
                pathname === "/settings/about-us"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Terms & Conditions",
          path: "/settings/terms-conditions",
          icon: (pathname) => (
            <IoMdPaper
              className={`text-xl ${
                pathname === "/settings/terms-conditions"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
        {
          title: "Support",
          path: "/settings/support",
          icon: (pathname) => (
            <BiSupport
              className={`text-xl ${
                pathname === "/settings/support"
                  ? "text-[#EEEEEE]"
                  : "text-[#A3A3A3]"
              }`}
            />
          ),
        },
      ],
    },
  ];

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="250"
        style={{
          overflow: "auto",
          position: "fixed",
          top: "80px",
          bottom: "16px",
          height: "auto",
          paddingBottom: "60px",
          overflowX: "hidden",
          zIndex: 2,
          margin: "8px 8px 0 8px",
          borderRadius: "8px",
          backgroundColor: "#242424",
        }}
      >
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "90%",
            marginTop: 16,
          }}
        >
          {linkItems.map((item, index) => (
            <li key={index} style={{ width: "100%", position: "relative" }}>
              {item.submenu ? (
                // Menu item with submenu
                <div
                  onClick={() => setOpenSubMenu((prev) => !prev)}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                    color: "#A3A3A3",
                    gap: "8px",
                    padding: "12px 8px 12px 35px",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ height: "24px" }}>{item.icon(pathname)}</div>
                    <div style={{ fontSize: "14px" }}>{item.title}</div>
                  </div>
                  <div style={{ marginRight: "20px" }}>
                    {openSubMenu ? (
                      <FiChevronUp className="text-[#A3A3A3]" />
                    ) : (
                      <FiChevronDown className="text-[#A3A3A3]" />
                    )}
                  </div>
                </div>
              ) : (
                // Normal link item
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    color: item.path === pathname ? "#EEEEEE" : "#A3A3A3",
                    alignItems: "center",
                    gap: "8px",
                    background: item.path === pathname ? "#0F78FF" : "none",
                    width: "100%",
                    padding: "12px 8px 12px 35px",
                  }}
                >
                  <div style={{ height: "24px" }}>{item.icon(pathname)}</div>
                  <div style={{ fontSize: "14px" }}>{item.title}</div>
                </Link>
              )}

              {/* Submenu rendering */}
              {item.submenu && openSubMenu && (
                <ul style={{ marginLeft: "30px", marginTop: "4px" }}>
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link
                        to={subItem.path}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color:
                            subItem.path === pathname ? "#EEEEEE" : "#A3A3A3",
                          background:
                            subItem.path === pathname ? "#0F78FF" : "none",
                          padding: "8px 8px 8px 20px",
                          gap: "6px",
                          fontSize: "14px",
                        }}
                      >
                        <div style={{ height: "24px" }}>
                          {subItem.icon(pathname)}
                        </div>
                        <div>{subItem.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {/* dividers */}
              {item.title === "Garage History" && (
                <hr
                  style={{
                    border: "none",
                    borderTop: "1px solid #19434C",
                    margin: "8px 0",
                  }}
                />
              )}
            </li>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 pl-8 py-3 w-full rounded-xl text-red-500 pb-10"
          >
            <CiLogout className="text-xl" />
            <span className="text-sm">Log Out</span>
          </button>
        </ul>
      </Sider>

      <Layout>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            height: "80px",
            zIndex: 1,
            padding: 0,
            backgroundColor: "#242424",
            display: "flex",
            justifyContent: "space-between",
            justifyItems: "center",
            paddingRight: "100px",
            paddingLeft: "69px",
          }}
        >
          <div className="flex justify-center items-center">
            <img src={logo} alt="logo" className="h-40" />
          </div>
          <div
            style={{
              width: "220px",
              display: "flex",
              alignItems: "center",
              gap: "40px",
              justifyContent: "space-between",
            }}
          >
            <Link to="/notification">
              <div
                style={{
                  width: 40,
                  height: 40,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <IoIosNotifications className="text-3xl text-[#E6E6E6]" />

                {!(unreadCount === 0) && (
                  <div
                    style={{
                      width: "16px",
                      height: "16px",
                      borderRadius: "50%",
                      background: "#0F78FF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#121212",
                      position: "absolute",
                      top: 2,
                      right: 4,
                      fontWeight: "500",
                      fontSize: "12px",
                    }}
                  >
                    {unreadCount}
                  </div>
                )}
              </div>
            </Link>
            <Link
              to={"/admin-profile"}
              style={{
                height: "42px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "10px",
              }}
            >
              <img
                src={src}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "100%",
                  objectFit: "cover",
                }}
                alt=""
              />
              <h2
                style={{
                  color: "#EEEEEE",
                  fontSize: "16px",
                  fontWeight: "500",
                  width: 200,
                  lineHeight: "24px",
                }}
              >
                {user?.name}
              </h2>
            </Link>
          </div>
        </Header>
        <Content
          style={{
            marginTop: "88px",
            marginBottom: "16px",
            marginLeft: "265px",
            marginRight: "16px",
            borderRadius: "8px",
            overflow: "auto",
            // backgroundColor: "#242424",
            overflowX: "hidden",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
