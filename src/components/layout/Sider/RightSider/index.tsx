import { ConversationBadge } from "@weavy/uikit-react";
import { useCallback, useContext, useState } from "react";
import Setting from "./Setting";
import Notification from "./Notification";
import { Bell, Envelope } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";
import { CurrentUserContext } from "../../../Context/CurrentUserContext";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

const RightSider = () => {
  const [active, setActive] = useState<string>("");
  const { currentUser }: any = useContext(CurrentUserContext);
  const navigate = useNavigate();

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
    <div className="sider right">
      <div className="sider-top">
        <div className="sider-item">
          <div className="icon-btn">
            <div
              className="icon-area"
              onClick={() => {
                activeHandler("messages");
                navigate("chat");
              }}
            >
              <Envelope />
              {(<ConversationBadge />).key !== null ? (
                <span className="abs-area">
                  <ConversationBadge />
                </span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="sider-item">
          <div className="icon-btn">
            <div
              className="icon-area"
              onClick={() => activeHandler("notification")}
            >
              <Bell />
              <span className="abs-area">3</span>
            </div>
          </div>
        </div>
        <div className="sider-item">
          <div className="profile-pic">
            <span
              className="icon-btn"
              onClick={() => activeHandler("settings")}
            >
              {currentUser?.avatarUrl && (
                <Image
                  className="avatar-img"
                  src={`${currentUser?.avatarUrl}` || ""}
                  alt="avatar"
                />
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="sider-main">
        {active === "messages" ? (
          <Message />
        ) : active === "notification" ? (
          <Notification />
        ) : active === "settings" ? (
          <Setting />
        ) : (
          <Setting />
        )}
      </div>
    </div>
  );
};

export default RightSider;
