import React from "react";

import { Badge, Image } from "react-bootstrap";

import Action from "../../actions/action";
import { POST_ACTION } from "../../../data/actionsData";
import { useProfile } from "../../hooks/useProfile";

const PostContent = ({ post }: any) => {
  const { info } = useProfile(post.username);

  return (
    <>
      {post ? (
        <div className="top-area pb-3">
          <div className="profile-area d-flex justify-content-between">
            <div className="avatar-item d-flex gap-3 align-items-center">
              <div className="avatar position-relative">
                <Image
                  className="avatar-img"
                  src={`${info.avatarUrl}`}
                  alt={post.username}
                />
              </div>
              <div className="info-area">
                <h5 className="m-0">
                  <a href="/">{post.username}</a>
                </h5>
              </div>
            </div>
            <Action actionList={POST_ACTION} />
          </div>
          <div className="ps-1 py-2">
            <p className="title">{post.title || ""}</p>
            <p className="content">{post.content || ""}</p>
            {post.tags ? (
              <p className="hashtag d-flex gap-2">
                {post.tags.map((tag: any) => (
                  <Badge key={tag}>#{tag}</Badge>
                ))}
              </p>
            ) : null}
          </div>
          {post.pictures && post.pictures.length ? (
            <div
              className={`post-img ${
                post.pictures?.length > 1 ? "d-flex gap-2" : ""
              } `}
            >
              {post.pictureUrls.length > 0 ? (
                post.pictureUrls.length > 1 ? (
                  post.pictureUrls.length > 2 ? (
                    <>
                      <div className="multiple">
                        <Image
                          src={`${post.pictureUrls[0]}` || ""}
                          alt="image"
                        />
                        <Image
                          src={`${post.pictureUrls[1]}` || ""}
                          alt="image"
                        />
                        <Image
                          src={`${post.pictureUrls[2]}` || ""}
                          alt="image"
                        />
                      </div>
                    </>
                  ) : (
                    <div className="double">
                      <Image src={`${post.pictureUrls[0]}` || ""} alt="image" />
                      <Image src={`${post.pictureUrls[1]}` || ""} alt="image" />
                    </div>
                  )
                ) : (
                  <Image
                    className="only"
                    src={`${post.pictureUrls[0]}` || ""}
                    alt="image"
                  />
                )
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
};

export default PostContent;
