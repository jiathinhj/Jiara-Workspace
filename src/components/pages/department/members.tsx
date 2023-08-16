import React, { useEffect, useState } from "react";
import AddMemberModal from "./addMember";
import PersonCard from "../../cards/person";
import { Button } from "react-bootstrap";
import { Plus } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/loading";
import { getAllAccount } from "../../../redux/actions";
import { apiResquest } from "../../../api";

const MemberTab = ({ managers, members, groupId }: any) => {
  const [showAccount, setShowAccount] = useState(false);
  const [addType, setAddType] = useState([]);
  const [memberList, setMemberList] = useState<string[]>([]);
  const [allAccounts, setAllAccounts] = useState<Object[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading }: any = useLoading();

  const isManager = useSelector((state: any) => state.group.isManager);

  const handleShowAccount = async (value: any) => {
    //call all members of the group
    setAddType(value);
    setShowAccount(true);
  };

  // close add member modal
  const handleCloseAccount = () => {
    setShowAccount(false);
  };

  //get all user for add member modal
  const fetchAllUsers = async () => {
    const res = await getAllAccount(dispatch);
    let newAccounts: Object[] = [];
    res &&
      res.forEach((element: any) => {
        const checkedMembers = {
          ...element,
          status:
            members?.includes(element.username) === true
              ? "already a member"
              : "not a member",
        };
        newAccounts.push(checkedMembers);
      });
    setAllAccounts(newAccounts);
  };

  const addMemberHandler = (newMembers: any) => {
    setMemberList([...memberList, ...newMembers]);
  };

  //delete member from group
  const removeMemberHandler = async (username: any) => {
    let selectedUser: string[] = [];
    var selectedList = [...selectedUser];
    selectedList = [...selectedUser, username];
    const url = `groups/${groupId}/members`;
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
      setLoading(false);
      setMemberList(remainingMembers);
    }
  };

  useEffect(() => {
    setMemberList(members);
  }, [members]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="member-tab">
      <div className="manager">
        <div className="top-area">
          <h5 className="header"> Managers </h5>
          {isManager ? (
            <Button
              onClick={() => handleShowAccount("addManager")}
              className="add  add-manager btn-transparent"
              // variant="outline-primary"
            >
              <Plus />
            </Button>
          ) : null}
        </div>
        <PersonCard
          type={"managers"}
          data={managers}
          allAccounts={allAccounts}
        />
      </div>
      <div className="member">
        <div className="top-area">
          <h5 className="header"> Members </h5>
          {isManager ? (
            <Button
              onClick={() => handleShowAccount("addMember")}
              className="add add-member btn-transparent"
              // variant="outline-primary"
            >
              <Plus />
            </Button>
          ) : null}
        </div>
        <PersonCard
          type={"members"}
          data={memberList?.filter(
            (member: any) => !managers?.includes(member)
          )}
          groupId={groupId}
          allAccounts={allAccounts}
          removeMemberHandler={(username: any) => removeMemberHandler(username)}
        />
      </div>
      <AddMemberModal
        show={showAccount}
        onHide={handleCloseAccount}
        groupId={groupId}
        addType={addType}
        members={members}
        allAccounts={allAccounts}
        addMemberHandler={addMemberHandler}
      />
    </div>
  );
};

export default MemberTab;
