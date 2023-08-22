import React, { useCallback, useState } from "react";
import Message from "../../../common/message";
import Setting from "../../../common/setting";
import Notification from "../../../common/notification";

const Right = () => {
  const [active, setActive] = useState<string>("");

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
    <div className="right-area position-relative d-flex ps-5 align-items-center justify-content-between">
      <div
        className={`single-item messages-area ${
          active === "message" ? "active" : ""
        }`}
      >
        {/* Message */}
        <Message />
      </div>
      <div
        className={`single-item messages-area notification-area ${
          active === "notification" ? "active" : ""
        }`}
      >
        {/* Notification */}
        <Notification activeHandler={activeHandler} />
      </div>
      <div
        className={`single-item profile-area position-relative ${
          active === "settings" ? "active" : ""
        }`}
      >
        {/* Setting */}
        <Setting activeHandler={activeHandler} />
      </div>
    </div>
  );
};

export default Right;
