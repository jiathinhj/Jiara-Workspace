import React, { useState } from "react";

import { Form, InputGroup } from "react-bootstrap";
import { PersonCircle, PlusCircle } from "react-bootstrap-icons";

import PostModal from "../Modals/PostModal";

const AddNewPost = ({ placeholder = "Start a discussion", groupId}: any) => {
  const [showModal, setShowModal] = useState(false);
  console.log('error')

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="add-new-post">
      <InputGroup>
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
