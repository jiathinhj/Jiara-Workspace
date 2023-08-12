import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import PostModal from "../modals/PostModal";
import axios from "axios";
import { apiURL, getGroupById } from "../../redux/apiRequest";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Action = ({
  actionList,
  groupId,
  data,
  component,
  path,
  deleteCommentHandler,
  editCommentHandler,
}: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleAction = (action: any) => {
    // handle post Action
    if (action === "Delete" && component === "post") {
      handleDeletePost();
    }
    if (action === "Edit" && component === "post") {
      setShowModal(true);
    }

    // handle comment Action
    if (action === "Delete" && component === "comment") {
      handleDeleteComment();
    }
    if (action === "Edit" && component === "comment") {
      handleEditComment();
    }
  };

  const handleDeletePost = async () => {
    await axios
      .delete(`${apiURL.groups}/${groupId}/${data.postId}`)
      .then((apiRequest) => {
        toast.success("Successfully deleted");
      })
      .catch((error) => {
        toast.error("Delete post failed");
      });
    getGroupById(groupId, toast, dispatch, navigate);
  };

  const handleDeleteComment = async () => {
    const body: object = {
      data: {
        commentId: data.commentId,
      },
    };
    await axios
      .delete(`${path}/comments`, body)
      .then(() => {
        deleteCommentHandler();
        toast.success("Successfully deleted");
      })
      .catch((error) => {
        toast.error("Delete comment failed");
      });
  };

  const handleEditComment = () => {
    editCommentHandler();
  };

  return (
    <DropdownButton
      className="action-dropdown"
      drop="end"
      title={<ThreeDots />}
    >
      {actionList?.map((itm: any) => (
        <Dropdown.Item
          key={itm.action}
          className="d-flex ms-3 gap-2"
          onClick={() => handleAction(itm.action)}
        >
          <div>{itm.icon} </div>
          <div>{itm.action}</div>
        </Dropdown.Item>
      ))}
      <PostModal
        showModal={showModal}
        handleClose={handleClose}
        groupId={groupId}
        post={data}
        action={"Edit"}
      />
    </DropdownButton>
  );
};

export default Action;
