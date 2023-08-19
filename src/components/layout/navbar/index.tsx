import { useCallback, useEffect, useState } from "react";

import Message from "../../common/message";
import Notification from "../../common/notification";
import Setting from "../../common/setting";

import logo from "../../../appLogo.png";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Nav,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const NavBar = () => {
  const [windowHeight, setWindowHeight] = useState(0);
  const [active, setActive] = useState<string>("");

  const navBarTop = () => {
    if (window !== undefined) {
      let height = window.scrollY;
      setWindowHeight(height);
    }
  };

  const activeHandler = useCallback(
    (opt: string) => {
      if (opt === active) {
        setActive("");
      } else {
        setActive(opt);
      }
    },
    [active]
  );
  // console.log("navBarRender");
  useEffect(() => {
    window.addEventListener("scroll", navBarTop);
    return () => {
      window.removeEventListener("scroll", navBarTop);
    };
  }, []);

  return (
    <header className={`header-section ${windowHeight > 50 && "header-fixed"}`}>
      <Navbar
        key={"lg"}
        expand={"lg"}
        className="sticky-top justify-content-between"
      >
        <Container>
          <Col lg={3} md={4} sm={4} className="left-area d-flex">
            <Navbar.Brand href="#home">
              <Image src={logo} className="logo " alt="logo" />
            </Navbar.Brand>
            <InputGroup className="search-bar">
              <Button className="search-button">
                <Search className="inline-icon" />
              </Button>
              <Form.Control placeholder="#hashtag" />
            </InputGroup>
          </Col>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Offcanvas
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Col xs={12}>
                <Nav className="nav-justified">
                  <Nav.Item>
                    <Nav.Link href={"/home"} eventKey="home">
                      Home
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href={"/department"} eventKey="department">
                      Department
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href={"/"} eventKey="test">
                      Nav-Item
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Col lg={3} md={5} sm={5}>
            <div className="right-area position-relative d-flex ps-5 align-items-center justify-content-between">
              <div
                className={`single-item messages-area ${
                  active === "message" ? "active" : ""
                }`}
              >
                {/* Message */}
                <Message />
              </div>
              <div
                className={`single-item messages-area notification-area ${
                  active === "notification" ? "active" : ""
                }`}
              >
                {/* Notification */}
                <Notification activeHandler={activeHandler} />
              </div>
              <div
                className={`single-item profile-area position-relative ${
                  active === "settings" ? "active" : ""
                }`}
              >
                {/* Setting */}
                <Setting activeHandler={activeHandler} />
              </div>
            </div>
          </Col>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
