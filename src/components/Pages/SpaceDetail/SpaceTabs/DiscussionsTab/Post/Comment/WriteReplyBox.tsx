import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Cursor } from "react-bootstrap-icons";

const WriteReplyBox
 = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <>
      <ul className="like-share d-flex mt-2">
        <li className="d-center">
          <button className="txtsm">Like</button>
        </li>
        <li className="d-center">
          <button
            className="txtsm reply-btn"
            onClick={() => setExpanded(!expanded)}
          >
            Reply
          </button>
        </li>
        <li className="d-center">
          <button className="txtsm">Share</button>
        </li>
      </ul>
      <Form action="reply-comment">
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="write-comment d-flex gap-3 ms-4"
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: {
                  opacity: 1,
                  height: "auto",
                },
                collapsed: { opacity: 0, height: 0, marginTop: 0 },
              }}
              transition={{ duration: 0.2, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <InputGroup className="d-flex">
                <Form.Control placeholder="Write a comment.." />
              </InputGroup>
              <Button type="submit" className="px-3">
                <Cursor />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Form>
    </>
  );
};

export default WriteReplyBox
;
