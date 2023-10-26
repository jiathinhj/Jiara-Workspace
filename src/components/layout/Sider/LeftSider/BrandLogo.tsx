import React from "react";
import { Image, Navbar } from "react-bootstrap";
import appLogo from "../../../../appLogo.png";

const BrandLogo = () => {
  return (
    <div className="brand">
      <a href="#home">
        <Image src={appLogo} className="logo " alt="logo" />
        <h6>JIARA WORKSPACE</h6>
      </a>
    </div>
  );
};

export default BrandLogo;
