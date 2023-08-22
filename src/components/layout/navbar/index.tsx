import { Container, Navbar } from "react-bootstrap";
import Left from "./nav/left";
import Center from "./nav/center";
import Right from "./nav/right";

const NavBar = () => {
  return (
    <header className="header-section">
      <Navbar className="d-flex">
        <Container>
          <Left />
          <Center />
          <Right />
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
