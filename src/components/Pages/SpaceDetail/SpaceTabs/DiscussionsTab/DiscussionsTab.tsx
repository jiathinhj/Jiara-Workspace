import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";
import { useQuery } from "react-query";
import Post from "./Post/Post";

const DiscussionsTab = () => {
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
      <div className="flex flex-col">
        <div>
          {detailGroup?.posts
            ? detailGroup.posts.map((post: any) => (
                <div
                  className={`${!post ? "animate-pulse" : ""}`}
                  style={{
                    background: "rgb(176, 190, 197)",
                    borderRadius: "0.8rem",
                  }}
                >
                  {post && (
                    <motion.div
                      key={post.postId}
                      initial={{ height: "16rem", opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      <Post
                        post={post}
                        handleShowPost={handleShowPost}
                        isManager={isManager}
                        groupId={detailGroup.groupId}
                      />
                    </motion.div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default DiscussionsTab;
