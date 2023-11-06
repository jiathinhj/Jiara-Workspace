import { Col, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Auth from "../../Auth";

import RightSider from "./Sider/RightSider";
import LeftSider from "./Sider/LeftSider";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Auth>
      <Row>
        <Col lg={2}>
          <LeftSider />
        </Col>
        <Col lg={7} className="layout-center">
          <Navbar />
          <div className="main-container">
            <Outlet />
          </div>
        </Col>
        <Col lg={3}>
          <RightSider />
        </Col>
      </Row>
    </Auth>
  );
};

export default Layout;
