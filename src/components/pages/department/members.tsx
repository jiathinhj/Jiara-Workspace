import React, { memo, useCallback, useEffect, useState } from "react";
import AddMemberModal from "./addMember";
import PersonCard from "../../cards/person";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../../context/loading";
import { getAllAccount } from "../../../redux/actions";
import { apiResquest } from "../../../api";

const MemberTab = memo(function MemberTab() {
  const [showAccount, setShowAccount] = useState(false);
  const [addType, setAddType] = useState([]);
  const [memberList, setMemberList] = useState<string[]>([]);

  const dispatch = useDispatch();

  const { setLoading }: any = useLoading();

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

  const handleGetAllAccounts = async () => {
    await getAllAccount(dispatch);
  };

  //display new added member
  const addMemberHandler = (newMembers: any) => {
    setMemberList([...memberList, ...newMembers]);
  };

  //delete member from group
  const removeMemberHandler = async (username: any) => {
    let selectedUser: string[] = [];
    var selectedList = [...selectedUser];
    selectedList = [...selectedUser, username];
    const url = `groups/${detailGroup.groupId}/members`;
    if (
      await apiResquest({
        method: "patch",
        url: url,
        data: selectedList,
        successMessage: "Successfully removed the member",
      })
    ) {
      const remainingMembers = memberList.filter(
        (member: any) => !member.includes(username)
      );
      setMemberList(remainingMembers);
    }
  };

  useEffect(() => {
    setMemberList(detailGroup.members);
  }, []);

  useEffect(() => {
    handleGetAllAccounts();
  }, []);

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
          data={memberList.filter(
            (member: any) => !detailGroup.managers?.includes(member)
          )}
          groupId={detailGroup.groupId}
          removeMemberHandler={(username: any) => removeMemberHandler(username)}
        />
      </div>
      <AddMemberModal
        show={showAccount}
        onHide={handleCloseAccount}
        addType={addType}
        addMemberHandler={addMemberHandler}
      />
    </div>
  );
});

export default MemberTab;
