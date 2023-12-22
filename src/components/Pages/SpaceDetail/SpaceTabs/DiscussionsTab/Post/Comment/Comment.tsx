import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../../../../../Hooks/useAxiosPrivate";
import ParentComment from "./ParentComment";
import SiblingComment from "./SiblingComments";
import { useQuery } from "react-query";

const Comment = ({ post, groupId }: any) => {
  const [newComment, setNewComment] = useState<string>();
  const [commentList, setCommentList] = useState<any>([]);

  const axiosPrivate = useAxiosPrivate();

  //query to get post details
  const fetchPostById = async () => {
    return await axiosPrivate({
      method: "get",
      url: `/groups/${groupId}/${post.postId}`,
    });
  };
  const { loading, data }: any = useQuery(
    ["post-detail", post.postId],
    fetchPostById,
    {
      refetchOnWindowFocus: false,
    }
  );

  const path = `/groups/${groupId}/${post.postId}`;
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
    setCommentList(data?.data.postData.comments);
    console.log(post);
  }, [data]);
  return (
    <div className="flex flex-col justify-between p-3 h-full">
      <div className="overflow-y-auto">
        {commentList && commentList.length
          ? commentList.map((comment: any) => (
              <div key={comment.commentId}>
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
            ))
          : null}
      </div>
      <div className="relative flex w-full items-end">
        <Input
          type="text"
          label="Add your comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="pr-20 focus:border-gray-800 placeholder-shown:border-gray-800 placeholder-shown:border-t-gray-800 border"
          containerProps={{
            className: "min-w-0" ,
          }}
          labelProps={{
            className: "!text-gray-600 peer-focus:after:!border-gray-800 peer-focus:before:!border-gray-800",
          }}
        />
        <Button
          size="sm"
          color={newComment ? "blue-gray" : "gray"}
          disabled={!newComment}
          className="!absolute right-1 top-1 rounded"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Comment;
