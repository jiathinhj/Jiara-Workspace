import React, { useCallback, useContext, useState } from "react";
import { Badge, Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import {
  Bell,
  Bookmarks,
  CalendarEvent,
  Gear,
  Globe,
  HouseDoor,
  JournalText,
  People,
  Sliders,
} from "react-bootstrap-icons";
import { NavLink, useParams } from "react-router-dom";
import Divider from "../../../Divider/Divider";

import logo from "../../../../logo.png";
import SideBar from "../LeftSider";
import { CurrentUserContext } from "../../../Context/CurrentUserContext";
import Setting from "./Setting";

const lEFT_SIDER = [
  { label: "Notification", icon: <Bell />, href: "/home" },
  { label: "Home", icon: <HouseDoor />, href: "/home" },
  { label: "People", icon: <Globe />, href: "#" },
  { label: "Department", icon: <People />, href: "/department" },
  { label: "Saved", icon: <Bookmarks />, href: "#" },
  { label: "Scheduler", icon: <CalendarEvent />, href: "/scheduler" },
  { label: "My Note", icon: <JournalText />, href: "#" },
  { label: "Setting", icon: <Gear />, href: "#" },
];
const LeftSider = () => {
  const [active, setActive] = useState<string>("");
  const { currentUser }: any = useContext(CurrentUserContext);

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
  return (
    <div>
      <nav className="sider left">
        <ProfileItem
          currentUser={currentUser}
          onClick={() => activeHandler("settings")}
        />
        <Divider clss={"divider-lg"} />
        <div className="sider-main">
          {lEFT_SIDER.map((item) => (
            <SiderBarItem item={item} />
          ))}
          <Divider clss={"divider-lg"} />
          {/* <Setting/> */}
        </div>
      </nav>
    </div>
  );
};

const ProfileItem = ({ currentUser, onClick }: any) => (
  <div className="profile-pic">
    <span className="icon-btn" onClick={onClick}>
      {currentUser?.avatarUrl && (
        <Image
          roundedCircle
          className="avatar-img"
          src={`${currentUser?.avatarUrl}` || ""}
          alt="avatar"
        />
      )}
    </span>
  </div>
);
const SiderBarItem = ({ item }: any) => (
  <OverlayTrigger
    placement="right"
    delay={{ show: 250, hide: 400 }}
    overlay={<Tooltip>{item.label}</Tooltip>}
  >
    <div key={`leftSider${item.label}`} className="sidebar-item">
      <div className="sider-badge"></div>
      <NavLink
        to={item.href}
        className={({ isActive }) =>
          isActive ? "active sidebar-icon" : "sidebar-icon"
        }
      >
        {item.icon}
      </NavLink>
    </div>
  </OverlayTrigger>
);

export default LeftSider;
