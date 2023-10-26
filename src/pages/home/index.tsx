import React from "react";

import FollowPeople from "../../components/common/followSlider";
import AddNewPost from "../../components/common/newPostBar";
import HomePost from "../../components/pages/home/post";

const HomeMain = () => {
  return (
    <div className="home-page">
      <AddNewPost />
      <FollowPeople />
      <HomePost />
    </div>
  );
};

export default HomeMain;
