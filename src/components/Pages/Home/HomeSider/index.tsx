import React from "react";
import { Col, Image, Row } from "react-bootstrap";

const notifications = [
  {
    src: "https://source.unsplash.com/random",
    author: "User1",
    message: "Commented: Hey you are right",
    time: "Just now",
  },
  {
    src: "https://source.unsplash.com/random",
    author: "User2",
    message: "Metioned you in a comment",
    time: "30s",
  },
  {
    src: "https://source.unsplash.com/random",
    author: "User3",
    message: "Commented: Hey you are right",
    time: "1m",
  },
  {
    src: "https://source.unsplash.com/random",
    author: "User4",
    message: "Commented: Hey you are right",
    time: "Just now",
  },
];

const HomeSider = () => {
  return (
    <div className="homesider">
      {notifications.map((notification, i) => (
        <Row key={notification.author + i} className="homesider-item">
          <Col xs={2}>
            <Image
              className="avatar-img"
              src={notification.src}
              alt="avatar"
              roundedCircle
            />
          </Col>
          <Col xs={10}>
            <div className="noti-content">
              <div className="noti-author">{notification.author}</div>
              <div className="noti-message">{notification.message}</div>
            </div>
          </Col>
          <div className="noti-time">{notification.time}</div>
        </Row>
      ))}
    </div>
  );
};

export default HomeSider;
