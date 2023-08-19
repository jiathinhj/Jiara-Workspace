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
  const [allAccounts, setAllAccounts] = useState<Object[]>([]);

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

  //get all user for add-member-modal
  // const fetchAllUsers = async () => {
  //   const res = await getAllAccount(dispatch);
  //   setAllAccounts(res);
  //   setMemberStatus();
  // };

  const setMemberStatus = useCallback(async () => {
    await getAllAccount(dispatch).then((res) => {
      let newAccounts: Object[] = [];
      res.forEach((element: any) => {
        const checkedMembers = {
          ...element,
          status:
            detailGroup.members?.includes(element.username) === true
              ? "already a member"
              : "not a member",
        };
        newAccounts.push(checkedMembers);
      });
      setAllAccounts(newAccounts);
      console.log("render");
    });
  }, [allAccounts]);

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
    setMemberStatus();
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
        <PersonCard
          type={"managers"}
          data={detailGroup.managers}
          allAccounts={allAccounts}
        />
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
          allAccounts={allAccounts}
          removeMemberHandler={(username: any) => removeMemberHandler(username)}
        />
      </div>
      <AddMemberModal
        show={showAccount}
        onHide={handleCloseAccount}
        addType={addType}
        allAccounts={allAccounts}
        addMemberHandler={addMemberHandler}
      />
    </div>
  );
});

export default MemberTab;
