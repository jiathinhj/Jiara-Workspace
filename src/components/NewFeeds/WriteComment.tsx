import { Cursor, EmojiLaughing, Images } from "react-bootstrap-icons";
import { Button, Form, FormLabel, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { apiURL, getPostById, postAPI } from "../../redux/apiRequest";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const WriteComment = ({ postId }: any) => {
  const groupId = useSelector((state: any) => state.group.detailGroup.groupId);
  const [comment, setComment] = useState<string>();

  const handleComment = async () => {
    let body = { content: comment };
    const path = `${apiURL.groups}/${groupId}/${postId}`;
    await postAPI(`${path}/comments`, body);
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

export default WriteComment;
