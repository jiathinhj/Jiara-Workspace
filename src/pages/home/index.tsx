import React from "react";

import AddNewPost from "../../Components/Common/AddNewPost";
import HomePost from "../../Components/Pages/Home/HomePosts";

const HomeMain = () => {
  return (
    <div className="home-page">
      <AddNewPost />
      <HomePost />
    </div>
  );
};

export default HomeMain;
