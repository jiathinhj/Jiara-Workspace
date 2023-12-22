import React, { memo, useState } from "react";
import { Button, Form, Image, InputGroup, Modal } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../../../../Apis/axiosConfig";
import useAllAccounts from "../../../Hooks/useAllAccounts";
import Avatar from "../../../Avatar";

const AddMemberModal = memo(function AddMemberModal({
  show,
  onHide,
  addType,
  onAddMember,
}: any) {
  const [accounts, setAccounts] = useState<object[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string[]>([]);

  //get data of current group from Redux
  const detailGroup = useSelector((state: any) => state.group.detailGroup);

  const handleMemberStatus = (res: any) => {
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
    setAccounts(newAccounts);
  };
  const { data: allUser } = useAllAccounts(handleMemberStatus);

  //handle search input
  const handleInputChange = (e: any) => {
    const matchedUsers = allUser.filter((user: any) =>
      inputValue !== "" && user
        ? user.username.toLowerCase().includes(inputValue)
        : allUser
    );
    setAccounts(matchedUsers);
  };

  //get selected user
  const handleCheckBox = (event: any) => {
    var updatedList = [...selectedUser];
    if (event.target.checked) {
      updatedList = [...selectedUser, event.target.value];
    } else {
      updatedList.splice(selectedUser.indexOf(event.target.value), 1);
    }
    setSelectedUser(updatedList);
  };

  //post selected managers/members to server
  const handleAddMember = async () => {
    if (addType === "addManager") {
      await Promise.all(
        selectedUser.map((username) => {
          const url = `/groups/${detailGroup.groupId}/managers/${username}`;
          axiosPrivate({
            method: "post",
            url: url,
            data: {},
          });
        })
      ).then(() => {
        onAddMember(selectedUser);
      });
    }
    if (addType === "addMember") {
      const url = `/groups/${detailGroup.groupId}/members`;
      try {
        await axiosPrivate({
          method: "post",
          url: url,
          data: selectedUser,
        });
        onAddMember(selectedUser);
      } catch (error) {}
    }
  };

  return (
    <Modal
      backdrop={"static"}
      className="add-member-modal"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add new people</Modal.Title>
      </Modal.Header>
      <InputGroup className="search-bar">
        <Button className="search-icon">
          <Search className="inline-icon" />
        </Button>
        <Form.Control
          placeholder="Input someone name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDownCapture={handleInputChange}
        />
      </InputGroup>
      <Modal.Body>
        {accounts &&
          accounts.map((account: any) => (
            <div
              key={`add-member-${account.username}`}
              className="account-list"
            >
              <div className="account d-flex">
                {account.avatarUrl ? (
                  <Image src={account.avatarUrl} />
                ) : (
                  <Avatar
                    firstname={account.firstname}
                    lastname={account.lastname}
                  />
                )}
                <div>{account.username}</div>
              </div>
              <div className="d-flex gap-2">
                {account.status === "already a member" ? (
                  <div className="txtmuted txtsm">member</div>
                ) : null}
                <Form.Check
                  type={"checkbox"}
                  disabled={
                    account.status === "already a member" ? true : false
                  }
                  value={account.username}
                  onChange={handleCheckBox}
                />
              </div>
            </div>
          ))}
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleAddMember}
          onClickCapture={onHide}
          style={{ width: "100%" }}
          variant="outline-primary"
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AddMemberModal;
