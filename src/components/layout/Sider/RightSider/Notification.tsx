import appLogo from "../../../../appLogo.png";

import { Col, Image, Row } from "react-bootstrap";
import { memo } from "react";

const Notification = memo(function Notification() {
  return (
    <>
      <div className="notifications-area">
        <div className="notifications">
          <Row className="notification">
            <Col xs={2}>
              <Image className="avatar-img" src={appLogo} alt="avatar" />
            </Col>
            <Col xs={7}>
              <div className="noti-content">
                <h6>Lu big</h6>
                <p>Comment on your post</p>
              </div>
            </Col>
            <Col xs={3}>
              <div className="noti-time txtsm">Just now</div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
});

export default Notification;
