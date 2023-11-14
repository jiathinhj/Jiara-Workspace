import { Button, Form, FormLabel, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";

import ParentComment from "./Comments/ParentComment";
import PostReaction from "./Body/PostReaction";
import SiblingComment from "./Comments/SiblingComments";
import { Cursor, EmojiLaughing, Images } from "react-bootstrap-icons";
import PostContent from "./Body/PostContent";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

import { motion } from "framer-motion";

const Post = ({ post, comments, groupId, postId }: any) => {
  const [newComment, setNewComment] = useState<string>();
  const [commentList, setCommentList] = useState<any>([]);

  const axiosPrivate = useAxiosPrivate();

  const path = `/groups/${groupId}/${postId}`;
  const addCommentHandler = async () => {
    let body = { content: newComment };
    try {
      await axiosPrivate({
        method: "post",
        url: `${path}/comments`,
        data: body,
      });
      const res = await axiosPrivate({ method: "get", url: path });
      setCommentList(res?.data.postData.comments);
    } catch (e) {}
    setNewComment("");
  };

  const deleteCommentHandler = (selectedCommentId: string) => {
    const remainingComments = commentList.filter(
      (comment: any) => !comment.commentId.includes(selectedCommentId)
    );
    setCommentList(remainingComments);
  };

  useEffect(() => {
    setCommentList(comments);
  }, [comments]);

  return (
    <div
      className={`${!post ? "animate-pulse" : ""} post-item`}
      style={{ background: "rgb(176, 190, 197)", borderRadius: "0.8rem" }}
    >
      {post && (
        <motion.div
          key={post.postId}
          className="post-single-box"
          initial={{ height: "16rem", opacity: 0 }}
          animate={{
            height: "auto",
            opacity: 1,
          }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {/* Post */}
          <PostContent post={post} />
          {/* Post Reaction */}
          <PostReaction />
          {/* Write Comment */}
          <div className="write-comment d-flex gap-3">
            <InputGroup className="d-flex">
              <Form.Control
                placeholder="Write a comment.."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="file-button">
                <FormLabel htmlFor="icon-file-button">
                  <Images className="icon-file-button" />
                </FormLabel>
                <Form.Control
                  type="file"
                  className="d-none"
                  id="icon-file-button"
                />
              </div>
              <Button className="emoji-button">
                <EmojiLaughing />
              </Button>
            </InputGroup>
            <div className="d-flex">
              <Button
                onClick={addCommentHandler}
                type="submit"
                className="px-4"
              >
                <Cursor />
              </Button>
            </div>
          </div>
          {commentList && commentList.length
            ? commentList.map((comment: any) => (
                <div key={comment.commentId} className="comments-area">
                  <div className="single-comment-area ">
                    {/* Parent Comment */}
                    <ParentComment
                      comment={comment}
                      path={path}
                      deleteCommentHandler={() =>
                        deleteCommentHandler(comment.commentId)
                      }
                    />

                    {/* Sibling Comment */}
                    {comment.replies &&
                      comment.replies.length &&
                      comment.replies.map(({ reply, i, arr }: any) => (
                        <SiblingComment
                          key={reply.replyId}
                          clss={
                            arr.length - 1 === i
                              ? "only-child-comment"
                              : "sibling-comment"
                          }
                          reply={reply}
                        />
                      ))}
                  </div>
                </div>
              ))
            : null}
        </motion.div>
      )}
    </div>
  );
};

export default Post;
