import { Bell } from "react-bootstrap-icons";
import avatar_lu from "../../images/avatar/lu1.jpg";
import avatar_li from "../../images/avatar/li.jpg";
import avatar_lan from "../../images/avatar/lan.jpg";
import avatar_lu4 from "../../images/avatar/lu4.jpg";

import { Image } from "react-bootstrap";
import { memo } from "react";

const Notification = memo(function Notification({
  activeHandler,
}: {
  activeHandler: (a: string) => void;
}) {
  console.log('notification render')
  return (
    <>
      <div className="notification-btn cmn-btn position-relative ">
        <div
          className="icon-area"
          onClick={() => activeHandler("notification")}
        >
          <Bell />
          <span className="abs-area position-absolute d-center mdtxt">3</span>
        </div>
      </div>
      <div className="main-area px-5 py-4 notification-content mt-2">
        <h5 className="mb-8">Notification</h5>
        <div className="single-box">
          <a
            href="/profile/notification"
            className="d-flex justify-content-between align-items-center"
          >
            <div className=" position-relative d-inline-flex gap-3">
              <div className="avatar position-relative d-inline-flex">
                <Image className="avatar-img" src={avatar_lu} alt="avatar" />
                {/* <Image
                  className="abs-item position-absolute"
                  src={speech_bubble}
                  alt="icon"
                /> */}
              </div>
              <div className="text-area">
                <h6 className="m-0 mb-1">Lu big</h6>
                <p className="mdtxt">Comment on your post</p>
              </div>
            </div>
            <div className="time-remaining">
              <p className="smtxt">Just now</p>
            </div>
          </a>
        </div>
        <div className="single-box">
          <a
            href="/profile/notification"
            className="d-flex justify-content-between  mb-0 align-items-center"
          >
            <div className="position-relative d-inline-flex gap-3">
              <div className="avatar position-relative d-inline-flex">
                <Image className="avatar-img" src={avatar_li} alt="avatar" />
                {/* <Image
                  className="abs-item position-absolute"
                  src={emoji_love}
                  alt="icon"
                /> */}
              </div>
              <div className="text-area">
                <h6 className="m-0 mb-1">Li</h6>
                <p className="mdtxt">Just poop on the floor</p>
              </div>
            </div>
            <div className="time-remaining">
              <p className="smtxt">2min</p>
            </div>
          </a>
        </div>
        <div className="single-box">
          <a
            href="/profile/notification"
            className="d-flex justify-content-between align-items-center"
          >
            <div className=" position-relative d-inline-flex gap-3">
              <div className="avatar position-relative d-inline-flex">
                <Image className="avatar-img" src={avatar_lan} alt="avatar" />
                {/* <Image
                  className="abs-item position-absolute"
                  src={emoji_love}
                  alt="icon"
                /> */}
              </div>
              <div className="text-area">
                <h6 className="m-0 mb-1">Lan</h6>
                <p className="mdtxt">Sent you a request</p>
              </div>
            </div>
            <div className="time-remaining">
              <p className="smtxt">1hr</p>
            </div>
          </a>
          <div className="btn-action position-relative d-flex mb-1 gap-2">
            <button className="btn-accept">Accept</button>
            <button className="btn-delete">Delete</button>
          </div>
        </div>
        <div className="single-box">
          <a
            href="/profile/notification"
            className="d-flex justify-content-between align-items-center"
          >
            <div className="position-relative d-inline-flex gap-3">
              <div className="avatar position-relative d-inline-flex">
                <Image className="avatar-img" src={avatar_lu4} alt="avatar" />
                {/* <Image
                  className="abs-item position-absolute"
                  src={emoji_love}
                  alt="icon"
                /> */}
              </div>
              <div className="text-area">
                <h6 className="m-0 mb-1">Another Lu</h6>
                <p className="mdtxt">Sleeping in the rest room</p>
              </div>
            </div>
            <div className="time-remaining">
              <p className="smtxt">2hr</p>
            </div>
          </a>
        </div>
        <div className="btn-area">
          <a href="/profile/notification">See all notification</a>
        </div>
      </div>
    </>
  );
});

export default Notification;
