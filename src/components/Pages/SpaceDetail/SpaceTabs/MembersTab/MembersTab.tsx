import React, { useState } from "react";
import AddMemberModal from "../../Modals/AddMember";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import useAxiosPrivate from "../../../../Hooks/useAxiosPrivate";
import MemberList from "./MemberList";

const MembersTab = () => {
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
    <>
      <div>
        <h5 className="text-gray-200 font-semibold"> Managers </h5>
        {isManager ? (
          <Button onClick={() => handleShowAccount("addManager")}>
            <Plus />
          </Button>
        ) : null}
      </div>
      <MemberList type={"managers"} data={detailGroup.managers} />
      <hr className="my-3" />
      <div>
        <h5 className="text-gray-200 font-semibold"> Members </h5>
        {isManager ? (
          <Button onClick={() => handleShowAccount("addMember")} className="">
            <Plus />
          </Button>
        ) : null}
        <MemberList
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
    </>
  );
};

export default MembersTab;
