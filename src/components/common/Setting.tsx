import { useEffect, useState } from "react";
import avatar_1 from "../../logo.jpeg";
import { Image } from "react-bootstrap";
import { Gear, Power } from "react-bootstrap-icons";

const Setting = ({ activeHandler }: { activeHandler: (a: string) => void }) => {
  const [user, setUser] = useState<any>({});

  const handleSignout = () => {
    localStorage.clear();
  };

  useEffect(() => {
    //get data of current user from Local Storage
    const currentUser: any = localStorage.getItem("currentUser");
    // const currentAvatar = JSON.parse(currentUser).avatar;
    setUser(JSON.parse(currentUser));
  }, []);

  return (
    <>
      <div className="profile-pic d-flex align-items-center">
        <span
          className="avatar cmn-btn active-status"
          onClick={() => activeHandler("settings")}
        >
          <img className="avatar-img" src={`${user.avatarUrl}`} alt="avatar" />
        </span>
      </div>
      <div className="main-area mt-2 p-4 profile-content">
        <div className="head-area">
          <div className="d-flex gap-3">
            <div className="avatar-item">
              <Image
                className="avatar-img"
                src={`${user.avatarUrl}`}
                alt="avatar"
              />
            </div>
            <div className="text-area">
              <h6 className="m-0">{`${user.lastname} ${user.firstname}`}</h6>
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
        {/* <div className="switch-wrapper mt-4 d-flex gap-1 align-items-center">
          <i
            className={`mat-icon material-symbols-outlined sun icon ${
              theme === "light" && "active"
            }`}
          >
            light_mode
          </i>
          <label className="switch">
            <input type="checkbox" className="checkbox" onClick={handleTheme} />
            <span
              className={`slider ${theme === "dark" ? " slider-active" : ""}`}
            ></span>
          </label>
          <i
            className={`mat-icon material-symbols-outlined moon icon ${
              theme === "dark" && "active"
            }`}
          >
            dark_mode
          </i>
          <span className="mdtxt ms-2">Dark mode</span>
        </div> */}
      </div>
    </>
  );
};

export default Setting;
