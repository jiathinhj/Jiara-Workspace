import React from "react";
import { Col } from "react-bootstrap";

import FollowPeople from "../../components/common/followSlider";
import LeftSider from "../../components/layout/menu/left";
import RightSider from "../../components/layout/menu/right";
import AddNewPost from "../../components/common/newPostBar";
import HomePost from "../../components/pages/home/post";

const HomeMain = () => {
  // useEffect (() => {dispatch fetch data here},[])
  // run effect when the cpn mounted
  return (
    <>
      <Col className="sider" xs={3}>
        <LeftSider />
      </Col>
      <Col className="main-content" xs={6}>
        <AddNewPost />
        <FollowPeople />
        <HomePost />
      </Col>
      <Col className="sider" xs={3}>
        <RightSider  />
      </Col>
    </>
  );
};

export default HomeMain;
