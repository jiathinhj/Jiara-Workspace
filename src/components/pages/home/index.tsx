import React from "react";
import { Col } from "react-bootstrap";

import FollowPeople from "../../common/FollowPeople";
import NewsFeeds from "../../NewFeeds/Post";
import LeftSider from "../../layout/menu/LeftSider";
import RightSider from "../../layout/menu/RightSider";
import AddNewPost from "../../common/AddNewPost";
import HomePost from "./HomePost";

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
