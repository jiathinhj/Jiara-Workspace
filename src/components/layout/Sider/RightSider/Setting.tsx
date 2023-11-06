import { memo, useContext } from "react";
import { Gear, Person, Power } from "react-bootstrap-icons";
import { DarkModeToggle } from "../../../ThemeToggle";
import { CurrentUserContext } from "../../../Context/CurrentUserContext";

const Setting = memo(function Setting() {
  const { currentUser }: any = useContext(CurrentUserContext);

  const handleSignout = () => {
    localStorage.clear();
  };

  return (
    <div className="profile-area">
      <div className="info-area">
        <h5>
          {`${currentUser?.lastname || "User"} ${currentUser?.firstname}` ||
            "User"}
        </h5>
        <em>Job tiltle</em>
      </div>
      <ul>
        <li className="view-profile">
          <a href="/profile">
            <Person />
            View profile
          </a>
        </li>
        <li>
          <a href="/">
            <Gear />
            Settings & Privacy
          </a>
        </li>
        <li>
          <a onClick={handleSignout} href="/login">
            <Power />
            Sign Out
          </a>
        </li>
      </ul>
      <span className="switch">Dark-mode</span> <DarkModeToggle />
    </div>
  );
});

export default Setting;
