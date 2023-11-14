import React from "react";
import AddNewPost from "../../../../Common/AddNewPost";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Post from "../../../../Common/Post";

const DepartmentFeed = () => {
  const navigate = useNavigate();

  //get manager status from Redux
  const isManager = useSelector((state: any) => state.group.isManager);
  //get data of current group from Redux
  const detailGroup = useSelector((state: any) => state.group.detailGroup);
  //navigate to post detail page
  const handleShowPost = (selectedPostId: string) => {
    const path = `/department/${detailGroup.groupId}/${selectedPostId}`;
    navigate(path); //direct to post details page
  };

  return (
    <>
      <div className="d-flex flex-column">
        {/* <AddNewPost
          groupId={detailGroup?.groupId}
          placeholder="Start a discussion"
        /> */}
        <div className="group-post">
          {detailGroup?.posts
            ? detailGroup.posts.map((post: any) => (
                <Post
                  clss="single-group-post"
                  post={post}
                  handleShowPost={handleShowPost}
                  isManager={isManager}
                  groupId={detailGroup.groupId}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default DepartmentFeed;
