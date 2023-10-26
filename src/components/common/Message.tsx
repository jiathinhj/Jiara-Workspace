import { Envelope } from "react-bootstrap-icons";

import { memo } from "react";
import { ConversationBadge } from "@weavy/uikit-react";

const Message = memo(function Message({
  activeHandler,
}: {
  activeHandler: (a: string) => void;
}) {
  return (
    <>
      <div className="messages-btn icon-btn">
        <div className="icon-area" onClick={() => activeHandler("messages")}>
          <Envelope />
          <span className="abs-area">
            <ConversationBadge />
          </span>
        </div>
      </div>
    </>
  );
});

export default Message;
