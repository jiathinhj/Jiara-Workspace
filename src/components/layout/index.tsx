import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Auth from "../../Auth";

import RightSider from "./Sider/RightSider";
import Navbar from "./Navbar";
import SideBar from "./Sider/LeftSider/SideBar";
import LeftSider from "./Sider/RightSider";

const Layout = () => {
  return (
    <Auth>
      <div className="layout">
        <div>
          <SideBar />
        </div>
        <div className="main-container">
          {/* <Navbar /> */}
          <Outlet />
        </div>
      </div>
      <div>
        <LeftSider />
      </div>
    </Auth>
  );
};

export default Layout;
