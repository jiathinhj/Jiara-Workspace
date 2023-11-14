import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HomeSider from "../../../Pages/Home/HomeSider";
import DepartmentSider from "../../../Pages/Department/DepartmentSider";
import { Image } from "react-bootstrap";
import appLogo from "../../../../appLogo.png";
import { ChevronBarDown, ChevronDown, ChevronUp } from "react-bootstrap-icons";
import Divider from "../../../Divider/Divider";

const SideBar = () => {
  const [expanded, setExpanded] = useState(true);
  return (
    <div className="sidebar-main">
      <header className="sidebar-header">
        <a href="#home" className="brand">
          <Image src={appLogo} className="logo" alt="logo" />
        </a>
        Your space
      </header>
      <div className="sidebar-container">
        <div className="sidebar-item" onClick={() => setExpanded(!expanded)}>
          {expanded ? <ChevronUp size={19} /> : <ChevronDown size={19} />}
          <div>Spaces</div>
        </div>
        {/* <Divider clss={"divider-sm"} /> */}
        {<DepartmentSider clss={expanded ? "active" : ""} />}
      </div>
    </div>
  );
};

export default SideBar;
