import React, { useState } from "react";
import { Button, Nav, Navbar } from "react-bootstrap";
import {
  Bookmarks,
  CalendarEvent,
  Gear,
  Globe,
  HouseDoor,
  JournalText,
  People,
  Sliders,
} from "react-bootstrap-icons";

const lEFT_SIDER = [
  { label: "Home", icon: <HouseDoor />, href: "/home" },
  { label: "People", icon: <Globe />, href: "#" },
  { label: "Department", icon: <People />, href: "/department" },
  { label: "Saved", icon: <Bookmarks />, href: "#" },
  { label: "Scheduler", icon: <CalendarEvent />, href: "#" },
  { label: "My Note", icon: <JournalText />, href: "#" },
  { label: "Setting", icon: <Gear />, href: "#" },
];
const LeftSider = () => {
  const [activeProfile, setActiveProfile] = useState<boolean>(false);

  return (
    <>
      <div>
        <Button
          className="btn-transparent d-lg-none"
          onClick={() => setActiveProfile(!activeProfile)}
        >
          <Sliders className="inline-icon" />
          <span
            style={{
              color: "var(--Primary)",
              marginLeft: "5px",
              fontWeight: "600",
              textTransform: "uppercase",
            }}
          >
            Menu
          </span>
        </Button>
      </div>
      <Navbar className={`sider left ${activeProfile && "active"}`}>
        <Nav>
          {lEFT_SIDER.map((items) => (
            <div
              key={`leftSider${items.label}`}
              className="d-flex m-4 mt-1 sidebar-item"
            >
              {items.icon}
              <Nav.Link href={items.href}>{items.label}</Nav.Link>
            </div>
          ))}
        </Nav>
      </Navbar>
    </>
  );
};

export default LeftSider;
