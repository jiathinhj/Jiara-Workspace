import React, { useContext } from "react";
import { Badge, Button, Card, Col } from "react-bootstrap";
import AddNewPost from "../../common/newPostBar";
import Action from "../../actions/action";
import { AUTHOR_ACTION, DELETE } from "../../../data/actionsData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/currentUser";
import Post from "../../common/post";

const FeedTab = () => {
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
        <AddNewPost
          groupId={detailGroup?.groupId}
          placeholder="Start a discussion"
        />
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

export default FeedTab;
