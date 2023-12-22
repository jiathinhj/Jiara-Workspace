import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Auth from "../../Auth";

import SideBar from "./Sider/LeftSider";

const Layout = () => {
  return (
    <div className="w-full h-screen grid grid-cols-[max-content_auto] grid-rows-[5fr_1fr] gap-y-2 p-2 bg-black">
      <SideBar />
      <div className="p-2 mt-5">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
