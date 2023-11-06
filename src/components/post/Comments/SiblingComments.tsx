import { Image } from "react-bootstrap";

import { COMMENT_ACTION } from "../../../Constants/CrudActions";

import CommentReply from "./WriteReplyBox";
import { useProfile } from "../../Hooks/useProfile";
import CrudActions from "../../Actions/CrudActions";

// interface CommentProps {
//   id: number;
//   replyText: string;
//   authorName: string;
//   authorAvt: any;
// }

const SiblingComment = ({
  reply,
  clss = "sibling-comment",
}: {
  reply: any;
  clss: string;
}) => {
  const { replyId, content, username } = reply;
  const { info } = useProfile(username);

  return (
    <div
      key={replyId}
      className={`${clss} comment-item-nested single-comment-area mt-2`}
    >
      <div className="d-flex gap-2">
        <div className="avatar-item">
          <Image className="avatar-img" src={info.avatarUrl} alt="avatar" />
        </div>
        <div className="info-item">
          <div className="top-area px-4 pt-2 d-flex gap-2 align-items-start justify-content-between">
            <div className="title-area">
              <h6>
                <a href="/">{username}</a>
              </h6>
              <p>{content}</p>
            </div>
            <CrudActions actionList={COMMENT_ACTION} />
          </div>

          {/* Replay Reaction */}
          <CommentReply />
        </div>
      </div>
    </div>
  );
};

export default SiblingComment;
