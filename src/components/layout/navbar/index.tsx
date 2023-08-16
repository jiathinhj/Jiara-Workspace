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
      <Navbar className="justify-content-between">
        <Container>
          <Col xs={3} className="left-area d-flex">
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
          <Col xs={6}>
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
          <Col xs={3}>
            <div className="right-area position-relative d-flex ps-5 align-items-center justify-content-between">
              <div
                className={`single-item d-none d-lg-block messages-area ${
                  active === "message" ? "active" : ""
                }`}
              >
                {/* Message */}
                <Message activeHandler={activeHandler} />
              </div>
              <div
                className={`single-item d-none d-lg-block messages-area notification-area ${
                  active === "notification" ? "active" : ""
                }`}
              >
                {/* Notification */}
                <Notification activeHandler={activeHandler} />
              </div>
              <div
                className={`single-item d-none d-lg-block profile-area position-relative ${
                  active === "settings" ? "active" : ""
                }`}
              >
                {/* Setting */}
                <Setting activeHandler={activeHandler} />
              </div>
            </div>
          </Col>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
