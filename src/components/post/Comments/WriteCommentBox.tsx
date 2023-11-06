import { Cursor, EmojiLaughing, Images } from "react-bootstrap-icons";
import { Button, Form, FormLabel, InputGroup } from "react-bootstrap";
import { useState } from "react";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const WriteCommentBox = ({ postId }: any) => {
  const groupId = useSelector((state: any) => state.group.detailGroup.groupId);
  const axiosPrivate = useAxiosPrivate();

  const [comment, setComment] = useState<string>();

  const handleComment = async () => {
    let body = { content: comment };
    const path = `/groups/${groupId}/${postId}`;
    await axiosPrivate({ method: "post", url: `${path}/comments`, data: body });
  };

  return (
    <div className="write-comment d-flex gap-3">
      <InputGroup className="d-flex">
        <Form.Control
          placeholder="Write a comment.."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="file-button">
          <FormLabel htmlFor="icon-file-button">
            <Images className="icon-file-button" />
          </FormLabel>
          <Form.Control type="file" className="d-none" id="icon-file-button" />
        </div>
        <Button className="emoji-button">
          <EmojiLaughing />
        </Button>
      </InputGroup>
      <div className="d-flex">
        <Button onClick={handleComment} type="submit" className="px-4">
          <Cursor />
        </Button>
      </div>
    </div>
  );
};

export default WriteCommentBox;
