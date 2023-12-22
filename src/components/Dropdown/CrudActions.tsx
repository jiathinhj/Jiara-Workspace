import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { ThreeDots } from "react-bootstrap-icons";
import PostModal from "../Modals/PostModal";
import { useDispatch } from "react-redux";
import { getGroupById } from "../../Apis/requests";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const CrudActions = ({
  actionList,
  groupId,
  data,
  component,
  path,
  deleteCommentHandler,
  editCommentHandler,
}: any) => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

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
    try {
      await axiosPrivate({
        method: "delete",
        url: `/groups/${groupId}/${data.postId}`,
        data: {},
      });
      getGroupById(groupId, dispatch);
    } catch (error) {}
  };

  const handleDeleteComment = async () => {
    try {
      await axiosPrivate({
        method: "delete",
        url: `${path}/comments`,
        data: {
          commentId: data.commentId,
        },
      });
      deleteCommentHandler();
    } catch (error) {}
  };

  const handleEditComment = () => {
    editCommentHandler();
  };

  return (
    <DropdownButton
      className="action-dropdown"
      drop="end"
      title={<ThreeDots className="inline-icon" />}
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

export default CrudActions;
