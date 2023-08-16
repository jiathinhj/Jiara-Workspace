import React, { memo, useEffect, useState } from "react";
import { Button, Form, Image, InputGroup, Modal } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import Avatar from "../../avatar/Avatar";
import { apiResquest } from "../../../api";

const AddMemberModal = memo(function AddMemberModal({
  show,
  onHide,
  groupId,
  addType,
  allAccounts,
  addMemberHandler,
}: any) {
  const [accounts, setAccounts] = useState<object[]>([]);
  const [inputValue, setInputValue] = useState<string>();
  const [selectedUser, setSelectedUser] = useState<string[]>([]);

  //handle search input and update list user from Redux store
  const handleInputChange = (value: any) => {
    setInputValue(value);

    const matchedUsers = accounts.filter((user: any) => {
      return !inputValue
        ? accounts
        : inputValue &&
            user &&
            user.username.toLowerCase().includes(inputValue);
    });
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
          const url = `/groups/${groupId}/managers/${username}`;
          apiResquest({
            method: "post",
            url: url,
            data: {},
            successMessage: "Successfully added new managers",
          });
        })
      ).then(() => {
        addMemberHandler(selectedUser);
      });
    }
    if (addType === "addMember") {
      const url = `/groups/${groupId}/members`;
      if (
        await apiResquest({
          method: "post",
          url: url,
          data: selectedUser,
          successMessage: "Successfully added new members",
        })
      ) {
        addMemberHandler(selectedUser);
      }
    }
  };

  useEffect(() => {
    setAccounts(allAccounts);
  }, [allAccounts]);

  return (
    <Modal
      backdrop={"static"}
      className="add-member-modal"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton closeVariant="white">
        <Modal.Title>Add new people</Modal.Title>
      </Modal.Header>
      <InputGroup className="search-bar">
        <Button className="search-icon">
          <Search className="inline-icon" />
        </Button>
        <Form.Control
          placeholder="Input someone name"
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
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
