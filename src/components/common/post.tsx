import React, { useContext } from "react";
import { Badge, Button, Card } from "react-bootstrap";
import { AUTHOR_ACTION, DELETE } from "../../Constants/CrudActions";
import { CurrentUserContext } from "../Context/CurrentUserContext";
import CrudActions from "../Actions/CrudActions";

const Post = ({
  clss = "",
  post,
  handleShowPost,
  isManager,
  groupId,
}: {
  clss: string;
  post: any;
  handleShowPost: Function;
  isManager?: boolean;
  groupId?: string;
}) => {
  //get data of current user from UserContext
  const { currentUser }: any = useContext(CurrentUserContext);

  return (
    <div key={`${clss}${post.postId}`} className={`${clss}`}>
      <Card key={post.postId}>
        <Card.Header className="d-flex justify-content-between">
          <div className="username">{post.username}</div>
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
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.content}</Card.Text>
          <Card.Text className="hashtag justify-content-center d-flex gap-2">
            {post.tags.map((tag: any) => (
              <Badge key={tag}>#{tag}</Badge>
            ))}
          </Card.Text>
          {post.pictureUrls && post.pictureUrls.length ? (
            <Card.Img
              src={`${
                post.pictureUrls[
                  Math.floor(Math.random() * post.pictureUrls?.length)
                ]
              }`}
            ></Card.Img>
          ) : null}
        </Card.Body>
        <Card.Footer>
          <div className="btn-footer">
            <Button
              variant="outline-primary"
              onClick={() => handleShowPost(post.postId)}
            >
              See more
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Post;
