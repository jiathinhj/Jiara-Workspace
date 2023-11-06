import { HandThumbsUp, Share, ChatSquareDots } from "react-bootstrap-icons";

const PostReaction = () => {
  return (
    <>
      <div className="total-react-share">
        <div className="react-list">
          <button className="txtsm"> 1 Like</button>
          <button className="txtsm">4 Comments</button>
          <button className="txtsm">1 Shares</button>
        </div>
      </div>
      <div className="like-comment-share">
        <button>
          <HandThumbsUp />
          Like
        </button>
        <button>
          <ChatSquareDots />
          Comment
        </button>
        <button>
          <Share />
          Share
        </button>
      </div>
    </>
  );
};

export default PostReaction;
