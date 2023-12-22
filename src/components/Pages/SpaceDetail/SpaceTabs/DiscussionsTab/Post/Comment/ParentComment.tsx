import { Button, Form, Image, InputGroup } from "react-bootstrap";
import { AUTHOR_ACTION, DELETE } from "../../../../../../../Constants/CrudActions";
import { useSelector } from "react-redux";
import { useContext, useState } from "react";
import axios from "axios";
import { Cursor, XCircle } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { CurrentUserContext } from "../../../../../../Context/CurrentUserContext";
import { useProfile } from "../../../../../../Hooks/useProfile";
import CrudActions from "../../../../../../Dropdown/CrudActions";
import WriteReplyBox from "./WriteReplyBox";
import {
  Avatar,
  ButtonGroup,
  Input,
  Typography,
} from "@material-tailwind/react";

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
    <div key={commentId}>
      <div className="w-full flex flex-col flex-start overflow-y-auto p-3">
        <div className="flex items-center">
          <Avatar
            variant="circular"
            size="sm"
            src="https://source.unsplash.com/random"
            alt=""
          />
          <p className="font-semibold mx-3 text-sm pb-1 text-gray-400">
            {"username"}
            <span className="text-xs mx-3 text-gray-800">{"2 minutes ago"}</span>
          </p>
        </div>

        <div className="bg-gray-800 bg-opacity-10 w-full p-4 rounded-b-xl rounded-tr-xl mt-[-0.4rem]">
          <p className=" text-sm">
            Hey all, <br />
            There are many variation of passages of Lorem ipsum avaliable, but
            the jority have alternation in some form , by injected humor, or
            randomise words which don't look even slightly believable.
          </p>
        </div>
      </div>

      {/* <Image
        className="avatar-img"
        src={info !== null ? info["avatarUrl"] : ""}
        alt="avatar"
      />

      <Typography href="/" as={"h6"}>
        {username}
      </Typography>

      <div className="relative flex w-full">
        <Input
          readOnly={isEditting ? false : true}
          defaultValue={content}
          value={editingComment}
          onChange={(e) => setEdittingComment(e.target.value)}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
          label={isEditting ? "Editting" : ""}
        />
        <ButtonGroup>
          {isEditting ? (
            <>
              <Button>
                <Cursor
                  style={{ margin: "auto" }}
                  onClick={() => handleEditComment(commentId)}
                />
              </Button>
              <Button>
                <XCircle
                  style={{ margin: "auto" }}
                  onClick={() => setIsEditting(false)}
                />
              </Button>
            </>
          ) : null}
        </ButtonGroup>

        {currentUser.username === username ? (
          isManager ? (
            <CrudActions
              actionList={AUTHOR_ACTION}
              component={"comment"}
              path={path}
              data={comment}
              deleteCommentHandler={() => deleteCommentHandler(commentId)}
              editCommentHandler={editCommentHandler}
            />
          ) : (
            <CrudActions
              actionList={DELETE}
              component={"comment"}
              path={path}
              data={comment}
              deleteCommentHandler={() => deleteCommentHandler(commentId)}
            />
          )
        ) : null}
      </div> */}
    </div>
  );
};

export default ParentComment;
