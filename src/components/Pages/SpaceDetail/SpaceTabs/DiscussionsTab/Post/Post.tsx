import React, { useContext } from "react";
// import { Badge, Button, Card } from "react-bootstrap";
import { AUTHOR_ACTION, DELETE } from "../../../../../../Constants/CrudActions";
import { CurrentUserContext } from "../../../../../Context/CurrentUserContext";
import CrudActions from "../../../../../Dropdown/CrudActions";
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { useProfile } from "../../../../../Hooks/useProfile";
import Comment from "./Comment/Comment";

const Post = ({
  post,
  handleShowPost,
  isManager,
  groupId,
  comments,
}: {
  post: any;
  handleShowPost: Function;
  isManager?: boolean;
  groupId?: string;
  comments?: any;
}) => {
  //get data of current user from UserContext
  const { currentUser }: any = useContext(CurrentUserContext);
  const { info } = useProfile(post.username);

  return (
    <Card key={post.postId} className="flex flex-row mb-5 p-3 bg-gray-900 min-h-[20rem]">
      <div className="w-[60%] min-w-[20rem] overflow-y-auto">
        <CardHeader
          color="transparent"
          floated={false}
          // shadow={false}
          className="flex items-center p-3 gap-3"
        >
          <Avatar
            size="sm"
            variant="circular"
            src={info !== null ? info["avatarUrl"] : ""}
            alt={post.username}
          />
          <div className="flex w-full flex-col">
            <div className="flex items-center justify-between">
              <Typography variant="h6" className="text-gray-400">
                {post.username}
              </Typography>
              <div className="flex items-center gap-0">
                {currentUser.username === post.username ? (
                  isManager ? (
                    <CrudActions
                      actionList={AUTHOR_ACTION}
                      groupId={groupId ? groupId : null}
                      data={post}
                      component={"post"}
                    />
                  ) : (
                    <CrudActions
                      actionList={DELETE}
                      groupId={groupId ? groupId : null}
                      data={post}
                      component={"post"}
                    />
                  )
                ) : null}
              </div>
            </div>
            <Typography className="text-sm text-gray-400">
              Developer
            </Typography>
          </div>
        </CardHeader>
        <CardBody>
          <Typography className="font-semibold mb-2 text-blue-gray-400">
            {post.title || ""}
          </Typography>
          <Typography variant="small" className="font-normal text-gray-500">
            {post.content || ""}
          </Typography>
          <div className="flex gap-2">
            {post?.tags
              ? post.tags.map((tag: any) => (
                  <Chip
                    size="sm"
                    key={tag}
                    variant="outlined"
                    className="font-normal lowercase my-3 border-primary"
                    value={`#${tag}`}
                  />
                ))
              : null}
          </div>
          {post.pictureUrls && post.pictureUrls.length ? (
            <img
              src={`${
                post.pictureUrls[
                  Math.floor(Math.random() * post.pictureUrls?.length)
                ]
              }`}
              alt="post"
              className="h-full w-full object-cover"
            />
          ) : null}
        </CardBody>
      </div>
      <div className="w-[40%]">
        <Comment post={post} groupId={groupId} />
      </div>
    </Card>
  );
};

export default Post;
