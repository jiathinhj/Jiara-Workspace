import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import NavBar from "./navbar";
import Auth from "../../auth";

const Layout = () => {
  return (
    <Auth>
      <Container>
        <NavBar />
        <Row className="main-container">
          <Outlet />
        </Row>
      </Container>
    </Auth>
  );
};

export default Layout;
