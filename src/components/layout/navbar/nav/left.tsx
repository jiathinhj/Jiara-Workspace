import React from "react";
import { Button, Form, Image, InputGroup, Navbar } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import logo from "../../../../appLogo.png";

const Left = () => {
  return (
    <div className="left-area">
      <Navbar.Brand href="#home">
        <Image src={logo} className="logo " alt="logo" />
      </Navbar.Brand>
      <InputGroup className="search-bar">
        <Button className="search-button">
          <Search className="inline-icon" />
        </Button>
        <Form.Control placeholder="#hashtag" />
      </InputGroup>
    </div>
  );
};

export default Left;
