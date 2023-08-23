import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const Center = () => {
  //   let location = useLocation();
  //   useEffect(() => {}, [location]);

  const navLinkClass = ({ isActive }: any) => {
    return isActive ? "active" : "";
  };

  // const [windowWidth, setWindowWidth] = useState(0);
  // const handleResize = () => {
  //   if (window !== undefined) {
  //     let width = window.innerWidth;
  //     setWindowWidth(width);
  //   }
  // };
  // console.log("navBarRender");
  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div className={`center-area`}>
      <div className="navbar-nav">
        <NavLink className={`${navLinkClass}`} to={"/home"}>
          Home
        </NavLink>
        <NavLink className={`${navLinkClass}`} to={"/department"}>
          Department
        </NavLink>
        <NavLink className={`${navLinkClass}`} to={"/"}>
          Nav-Item
        </NavLink>
      </div>
    </div>
  );
};

export default Center;
