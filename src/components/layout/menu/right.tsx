import Contact from "../../pages/home/contact";
import Request from "../../pages/home/request";
import { Button, Nav, Navbar } from "react-bootstrap";

const RightSider = () => {
  return (
    <>
      <Navbar className="sider right">
        <Nav>
          <Nav.Item className="sidebar-item p-3 mb-4">
            {/* Request */}
            <Request />
          </Nav.Item>
          <Nav.Item className="sidebar-item p-3">
            {/* Contact */}
            <Contact />
          </Nav.Item>
        </Nav>
      </Navbar>
    </>
  );
};

export default RightSider;
