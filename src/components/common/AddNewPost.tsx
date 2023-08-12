import React, { useState } from "react";

import { Form, InputGroup } from "react-bootstrap";
import { PersonCircle, PlusCircle } from "react-bootstrap-icons";

import PostModal from "../modals/PostModal";

const AddNewPost = ({ placeholder = "", groupId}: any) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="add-new-post">
      <InputGroup className="">
        <InputGroup.Text>
          <PersonCircle className="inline-icon" />
        </InputGroup.Text>
        <Form.Control placeholder={placeholder} onClick={handleShow} />
        <PostModal showModal={showModal} handleClose={handleClose} groupId={groupId} action="Add" />
        <InputGroup.Text>
          <PlusCircle
            className="inline-icon"
            style={{ cursor: "pointer" }}
            onClick={handleShow}
          />
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
};

export default AddNewPost;
