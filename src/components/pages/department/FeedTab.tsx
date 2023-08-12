import React from "react";
import { Badge, Button, Card, Col } from "react-bootstrap";
import AddNewPost from "../../common/AddNewPost";
import Action from "../../actions/Actions";
import { AUTHOR_ACTION, DELETE } from "../../../data/actionsData";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FeedTab = ({ posts, groupId, currentAccount }: any) => {
  // const [groupPosts]

  const navigate = useNavigate();

  //get manager status
  const isManager = useSelector((state: any) => state.group.isManager);

  //navigate to post detail page
  const handleShowPost = (selectedPostId: string) => {
    const path = `/department/${groupId}/${selectedPostId}`;
    navigate(path); //direct to post details page
  };

  return (
    <>
      <div className="d-flex flex-column">
        <AddNewPost groupId={groupId} placeholder="Start a discussion" />
        <Col className="group-post">
          {posts &&
            posts.map((post: any, i: any) => {
              const {
                postId,
                title,
                content,
                pictureUrls,
                tags,
                username,
              }: any = post;
              return (
                <Col
                  xl="6"
                  sm="8"
                  key={`group-post${postId}`}
                  className={`${
                    i % 2 === 0 ? "even " : "odd "
                  }single-group-post`}
                >
                  <Card key={postId}>
                    <Card.Header className="d-flex justify-content-between">
                      <div className="username">{username}</div>
                      {currentAccount.username === username ? (
                        isManager ? (
                          <Action
                            actionList={AUTHOR_ACTION}
                            // postId={postId}
                            groupId={groupId}
                            data={post}
                            component={"post"}
                          />
                        ) : (
                          <Action
                            actionList={DELETE}
                            groupId={groupId}
                            data={post}
                            component={"post"}
                          />
                        )
                      ) : null}
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{title}</Card.Title>
                      <Card.Text>{content}</Card.Text>
                      <Card.Text className="hashtag justify-content-center d-flex gap-2">
                        {tags.map((tag: any) => (
                          <Badge key={tag}>#{tag}</Badge>
                        ))}
                      </Card.Text>
                      {pictureUrls && pictureUrls.length ? (
                        <Card.Img
                          src={`${
                            pictureUrls[
                              Math.floor(Math.random() * pictureUrls?.length)
                            ]
                          }`}
                        ></Card.Img>
                      ) : null}
                    </Card.Body>
                    <Card.Footer>
                      <div className="btn-footer">
                        <Button
                          variant="outline-primary"
                          onClick={() => handleShowPost(postId)}
                        >
                          See more
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              );
            })}
        </Col>
      </div>
    </>
  );
};

export default FeedTab;
