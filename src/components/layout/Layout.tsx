import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import NavBar from "./navbar/NavBar";
import Authorization from "../../auth/Authorization";
import { useLoading } from "../preloader/LoadingContext";
import { useEffect } from "react";
import Preloader from "../preloader/Preloader";

const Layout = () => {


  return (
    <Authorization>
      <Container>
        <NavBar />

        <Row className="main-container">
          <Outlet />
        </Row>
      </Container>
    </Authorization>
  );
};

export default Layout;
