import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Auth from "../../auth";

import RightSider from "./Sider/RightSider";
import LeftSider from "./Sider/LeftSider";
import WeawyChat from "../WeawyChat";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <Auth>
      <WeawyChat>
        <Row>
          <Col lg={2}>
            <LeftSider />
          </Col>
          <Col lg={7}>
            <Navbar />
            <div className="main-container">
              <Outlet />
            </div>
          </Col>
          <Col lg={3}>
            <RightSider />
          </Col>
        </Row>
      </WeawyChat>
    </Auth>
  );
};

export default Layout;
