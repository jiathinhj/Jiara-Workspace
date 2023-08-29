import { Image } from "react-bootstrap";
import { Envelope } from "react-bootstrap-icons";

import messageData from "../../data/peopleData";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Message = memo(function Message() {
  const navigate = useNavigate();
  return (
    <>
      <div className="messages-btn cmn-btn position-relative">
        <div className="icon-area" onClick={() => navigate("/chat")}>
          <Envelope />
          <span className="abs-area position-absolute mdtxt">4</span>
        </div>
      </div>
      {/* <div className="main-area mt-2 px-5 py-4 messages-content">
        <h5>Messages</h5>
        {messageData.map((message) => {
          const { id, last_message, number_of_message, user_avt, user_name } =
            message;

          return (
            <div key={id} className="single-box">
              <a
                href="/profile/chat"
                className="d-flex gap-2 align-items-center"
              >
                <div className="avatar">
                  <Image className="avatar-img" src={user_avt} alt="avatar" />
                </div>
                <div className="text-area">
                  <div className="title-area position-relative d-inline-flex align-items-center">
                    <h6 className="m-0 d-inline-flex">{user_name}</h6>
                    {number_of_message && (
                      <span className="abs-area position-absolute mdtxt">
                        {number_of_message}
                      </span>
                    )}
                  </div>
                  <p>{last_message}</p>
                </div>
              </a>
            </div>
          );
        })}
        <div className="btn-area">
          <a href="/profile/chat">See all inbox</a>
        </div>
      </div> */}
    </>
  );
});

export default Message;
