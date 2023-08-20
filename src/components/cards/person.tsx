import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import Avatar from "../avatar/Avatar";

const PersonCard = ({ data, type, removeMemberHandler }: any) => {
  const isManager = useSelector((state: any) => state.group.isManager);
  const [handledData, setHandledData] = useState<Object[]>([]);

  const allUser = useSelector((state: any) => state.user.allUser);

  const handleMapInfo = () => {
    let newData: Object[] = [];
    data.forEach((element: any) => {
      const fullInfo = {
        username: element,
        info: allUser.find((account: any) => account.username === element),
      };
      newData.push(fullInfo);
    });
    setHandledData(newData);
    console.log(handledData);
  };

  useEffect(() => {
    data && data.length && allUser && allUser.length && handleMapInfo();
  }, [data, allUser]);

  return (
    <Row className="person-card">
      {handledData.map(({ username, info }: any) => (
        <Col
          key={`person-card-${type}-${username}`}
          xs={6}
          sm={6}
          lg={6}
          xl={4}
        >
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
      ))}
    </Row>
  );
};

export default PersonCard;
