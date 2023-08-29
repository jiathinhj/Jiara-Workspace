import { Form, Image, InputGroup } from "react-bootstrap";
import Action from "../../actions/action";
import { AUTHOR_ACTION, DELETE } from "../../../data/actionsData";
import CommentReply from "./reply";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import axios from "axios";
import { Cursor, XCircle } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { CurrentUserContext } from "../../context/currentUser";
import { useProfile } from "../../hooks/useProfile";

// interface CommentProps {
//   id: number;
//   commentText: string;
//   authorName: string;
//   authorAvt: any;
//   replies: {}[];
// }

const ParentComment = ({ comment, path, deleteCommentHandler }: any) => {
  const { commentId, content, username, replies } = comment;

  const { currentUser }: any = useContext(CurrentUserContext);
  const { info } = useProfile(username);
  //get data of current user from Redux
  // const currentUser = useSelector((state: any) => state.auth.currentUser);
  const isManager = useSelector((state: any) => state.group.isManager);

  const [isEditting, setIsEditting] = useState(false);
  const [editingComment, setEdittingComment] = useState<any>();

  const editCommentHandler = () => {
    setIsEditting(true);
  };

  const handleEditComment = async (selectedCommentId: any) => {
    const body = { content: editingComment, commentId: selectedCommentId };
    await axios
      .patch(`${path}/comments`, body)
      .then(() => {
        setIsEditting(false);
        toast.success("Comment updated successfully");
      })
      .catch((error) => {
        toast.error("Failed");
      });
  };

  return (
    <div
      key={commentId}
      className={`${
        replies && replies.length > 0 ? "parent-comment" : ""
      } d-flex gap-2 `}
    >
      <div className="avatar-item">
        <Image className="avatar-img" src={info.avatarUrl} alt="avatar" />
      </div>
      <div className="info-item w-50">
        <div className="top-area px-4 pt-2 d-flex gap-2 align-items-start justify-content-between">
          <div className="main-area">
            <h6>
              <a href="/">{username}</a>
            </h6>
            <div className="edit-comment-area">
              <InputGroup className={isEditting ? "editing-comment" : ""}>
                <Form.Control
                  readOnly={isEditting ? false : true}
                  defaultValue={content}
                  value={editingComment}
                  onChange={(e) => setEdittingComment(e.target.value)}
                />
              </InputGroup>
              {isEditting ? (
                <>
                  {" "}
                  <Cursor
                    style={{ margin: "auto" }}
                    onClick={() => handleEditComment(commentId)}
                  />
                  <XCircle
                    style={{ margin: "auto" }}
                    onClick={() => setIsEditting(false)}
                  />
                </>
              ) : null}
            </div>
          </div>

          {currentUser.username === username ? (
            isManager ? (
              <Action
                actionList={AUTHOR_ACTION}
                component={"comment"}
                path={path}
                data={comment}
                deleteCommentHandler={() => deleteCommentHandler(commentId)}
                editCommentHandler={editCommentHandler}
              />
            ) : (
              <Action
                actionList={DELETE}
                component={"comment"}
                path={path}
                data={comment}
                deleteCommentHandler={() => deleteCommentHandler(commentId)}
              />
            )
          ) : null}
        </div>
        {/* Replay Reaction */}
        <CommentReply />
      </div>
    </div>
  );
};

export default ParentComment;
