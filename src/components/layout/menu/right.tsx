import Contact from "../../pages/home/contact";
import Request from "../../pages/home/request";
import { Nav, Navbar } from "react-bootstrap";

const RightSider = () => {
  return (
    <Navbar className="sidebar-nav right">
      <Nav className="d-md-block">
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
  );
};

export default RightSider;
