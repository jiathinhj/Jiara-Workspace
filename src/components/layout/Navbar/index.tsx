import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const Navbar = () => {
  return (
    <nav className="navbar-center">
      <div className="search-bar">
        <InputGroup>
          <Button className="search-button">
            <Search className="inline-icon" />
          </Button>
          <Form.Control placeholder="#hashtag" />
        </InputGroup>
      </div>
    </nav>
  );
};

export default Navbar;
