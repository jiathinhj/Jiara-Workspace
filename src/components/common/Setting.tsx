import { memo, useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { Gear, Power } from "react-bootstrap-icons";
import { DarkModeToggle } from "../themeToggle";

const Setting = memo(function Setting({
  activeHandler,
}: {
  activeHandler: (a: string) => void;
}) {
  const [userProFile, setUserProFile] = useState<any>({});

  const handleSignout = () => {
    localStorage.clear();
  };
  console.log("Setting render");

  useEffect(() => {
    const localUser: any = localStorage.getItem("currentUser");
    const parsedUser = JSON.parse(localUser);
    setUserProFile(parsedUser);
  }, []);
  return (
    <>
      <div className="profile-pic d-flex align-items-center">
        <span
          className="avatar cmn-btn active-status"
          onClick={() => activeHandler("settings")}
        >
          <img
            className="avatar-img"
            src={`${userProFile.avatarUrl}`}
            alt="avatar"
          />
        </span>
      </div>
      <div className="main-area mt-2 p-4 profile-content">
        <div className="head-area">
          <div className="d-flex gap-3">
            <div className="avatar-item">
              <Image
                className="avatar-img"
                src={`${userProFile.avatarUrl}`}
                alt="avatar"
              />
            </div>
            <div className="text-area">
              <h6 className="m-0">{`${userProFile.lastname} ${userProFile.firstname}`}</h6>
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
        <DarkModeToggle />
      </div>
    </>
  );
});

export default Setting;
