import { memo, useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Gear, Power } from "react-bootstrap-icons";
import { DarkModeToggle } from "../themeToggle";
import Avatar from "../avatar/Avatar";
import { CurrentUserContext } from "../context/currentUser";

const Setting = memo(function Setting({
  activeHandler,
}: {
  activeHandler: (a: string) => void;
}) {
  const { currentUser }: any = useContext(CurrentUserContext);

  const handleSignout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <div className="profile-pic d-flex align-items-center">
        <span
          className="avatar cmn-btn active-status"
          onClick={() => activeHandler("settings")}
        >
          {currentUser?.avatarUrl ? (
            <Image
              className="avatar-img"
              src={`${currentUser?.avatarUrl}` || ""}
              alt="avatar"
            />
          ) : (
            <Avatar firstname={"J"} lastname={"R"} />
          )}
        </span>
      </div>
      <div className="main-area mt-2 p-4 profile-content">
        <div className="head-area">
          <div className="d-flex gap-3">
            <div className="avatar-item">
              {currentUser?.avatarUrl ? (
                <Image
                  className="avatar-img"
                  src={`${currentUser?.avatarUrl}` || ""}
                  alt="avatar"
                />
              ) : (
                <Avatar firstname={"J"} lastname={"R"} />
              )}
            </div>
            <div className="text-area">
              <h6 className="m-0">
                {`${currentUser?.lastname || "User"} ${
                  currentUser?.firstname
                }` || "User"}
              </h6>
              <p className="mdtxt">Job tiltle</p>
            </div>
          </div>
        </div>
        <div className="view-profile my-2 ">
          <a href="/profile" className="mdtxt text-center p-2">
            View profile
          </a>
        </div>
        <ul>
          <li>
            <a href="/" className="mdtxt">
              <Gear />
              Settings & Privacy
            </a>
          </li>
          <li>
            <a onClick={handleSignout} href="/login" className="mdtxt">
              <Power />
              Sign Out
            </a>
          </li>
        </ul>
        <span className="switch">Dark-mode</span> <DarkModeToggle />
      </div>
    </div>
  );
});

export default Setting;
