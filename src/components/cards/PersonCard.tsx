import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import Avatar from "../Avatar/Avatar";

const PersonCard = ({ data, type, allAccounts, removeMemberHandler }: any) => {
  const isManager = useSelector((state: any) => state.group.isManager);

  const [handledData, setHandledData] = useState<Object[]>([]);
  const handleMapInfo = () => {
    let newData: Object[] = [];
    data.forEach((element: any) => {
      const fullInfo = {
        username: element,
        info: allAccounts.find((account: any) => account.username === element),
        // .filter((account: any) =>
        //   account.username.includes(element)
        // ),
      };
      newData.push(fullInfo);
    });
    setHandledData(newData);
    console.log(handledData);
  };

  useEffect(() => {
    if (data && data.length && allAccounts && allAccounts.length) {
      handleMapInfo();
    }
  }, [data, allAccounts]);

  return (
    <Row className="person-card">
      {handledData
        ? handledData.map(({ username, info }: any) => (
            <Col key={`person-card-${type}-${username}`} md="9" lg="7" xl="4">
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
                        <Card.Title>{username}</Card.Title>
                        {isManager && type === "members" ? (
                          <Button
                            onClick={() => removeMemberHandler(username)}
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
            </Col>
          ))
        : null}
    </Row>
  );
};

export default PersonCard;
