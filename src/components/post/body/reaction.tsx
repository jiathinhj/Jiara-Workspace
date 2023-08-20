import { HandThumbsUp, Share, ChatSquareDots } from "react-bootstrap-icons";

const PostReaction = () => {
  return (
    <>
      <div
        className="total-react-share d-flex flex-row justify-content-between"
      >
        <div className="react-list">
        <button className="txtsm"> 1 Like</button>
          <button className="txtsm">4 Comments</button>
          <button className="txtsm">1 Shares</button>
        </div>
      </div>
      <div className="like-comment-share py-3 my-3 d-flex justify-content-between">
        <button className="d-center">
          <HandThumbsUp/> {" "}
          Like
        </button>
        <button className="d-center">
          <ChatSquareDots/>{" "}
          Comment
        </button>
        <button className="d-center">
          <Share/>
          Share
        </button>
      </div>
    </>
  );
};

export default PostReaction;
