import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import Avatar from "../Avatar";
import useAllAccounts from "../Hooks/useAllAccounts";

const PersonCard = ({ data, type, onRemoveMember }: any) => {
  const isManager = useSelector((state: any) => state.group.isManager);
  const [handledData, setHandledData] = useState<Object[]>([]);

  const handleMapInfo = (res: any) => {
    let newData: Object[] = [];
    data.forEach((element: any) => {
      const fullInfo = {
        username: element,
        info: res.find((account: any) => account.username === element),
      };
      newData.push(fullInfo);
    });
    setHandledData(newData);
  };
  const { data: allUser } = useAllAccounts(handleMapInfo);

  return (
    <div className="person-cards">
      {handledData.map(({ username, info }: any) => (
        <div className="person-card" key={`person-card-${type}-${username}`}>
          <Card>
            <Card.Body className="p-3">
              <div className="d-flex">
                <div className="flex-shrink-0">
                  {info.avatarUrl ? (
                    <Card.Img src={info.avatarUrl} />
                  ) : (
                    <Avatar
                      firstname={info.firstname}
                      lastname={info.lastname}
                    />
                  )}
                </div>
                <div className="flex-grow-1 ms-3">
                  <div className="d-flex justify-content-between">
                    <Card.Title>{info.username}</Card.Title>
                    {isManager && type === "members" ? (
                      <Button
                        onClick={() => onRemoveMember(info.username)}
                        size="sm"
                        className="remove-btn"
                        variant="outline-danger"
                      >
                        <Trash />
                      </Button>
                    ) : null}
                  </div>
                  <div className="d-flex pt-3">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-1 flex-grow-1"
                    >
                      Chat
                    </Button>
                    <Button size="sm" className="flex-grow-1">
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PersonCard;
