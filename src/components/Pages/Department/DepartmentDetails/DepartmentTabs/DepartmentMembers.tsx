import React, { useState } from "react";
import AddMemberModal from "../../Modals/AddMember";
import PersonCard from "../../../../Cards/Person";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";

const DepartmentMembers = () => {
  const [showAccount, setShowAccount] = useState(false);
  const [addType, setAddType] = useState([]);
  const [memberList, setMemberList] = useState<string[]>([]);

  const axiosPrivate = useAxiosPrivate();

  //get manager status from Redux
  const isManager = useSelector((state: any) => state.group.isManager);
  //get data of current group from Redux
  const detailGroup = useSelector((state: any) => state.group.detailGroup);

  //show add-member-modal
  const handleShowAccount = (value: any) => {
    setAddType(value);
    setShowAccount(true);
  };

  // close add-member-modal
  const handleCloseAccount = () => {
    setShowAccount(false);
  };

  //display new added member
  const handleAddMember = (newMembers: any) => {
    setMemberList([...memberList, ...newMembers]);
  };

  //delete member from group
  const handleRemoveMember = async (username: any) => {
    let selectedUser: string[] = [];
    var selectedList = [...selectedUser];
    selectedList = [...selectedUser, username];
    const url = `groups/${detailGroup.groupId}/members`;
    try {
      await axiosPrivate({
        method: "patch",
        url: url,
        data: selectedList,
      });
      const remainingMembers = memberList.filter(
        (member: any) => !member.includes(username)
      );
      setMemberList(remainingMembers);
    } catch (error) {}
  };

  return (
    <div className="member-tab">
      <div className="manager">
        <div className="top-area">
          <h5 className="header"> Managers </h5>
          {isManager ? (
            <Button
              onClick={() => handleShowAccount("addManager")}
              className="add  btn-transparent"
            >
              <Plus className="inline-icon" />
            </Button>
          ) : null}
        </div>
        <PersonCard type={"managers"} data={detailGroup.managers} />
      </div>
      <div className="member">
        <div className="top-area">
          <h5 className="header"> Members </h5>
          {isManager ? (
            <Button
              onClick={() => handleShowAccount("addMember")}
              className="add btn-transparent"
            >
              <Plus className="inline-icon" />
            </Button>
          ) : null}
        </div>
        <PersonCard
          type={"members"}
          data={memberList?.filter(
            (member: any) => !detailGroup.managers.includes(member)
          )}
          groupId={detailGroup.groupId}
          onRemoveMember={(username: any) => handleRemoveMember(username)}
        />
      </div>
      <AddMemberModal
        show={showAccount}
        onHide={handleCloseAccount}
        addType={addType}
        onAddMember={handleAddMember}
      />
    </div>
  );
};

export default DepartmentMembers;
