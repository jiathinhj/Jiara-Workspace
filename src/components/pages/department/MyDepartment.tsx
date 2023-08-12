import { useEffect } from "react";
import { getAllGroup } from "../../../redux/apiRequest";
import { Badge, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import DepartmentMain from ".";
import { useLoading } from "../../preloader/LoadingContext";

const MyDepartment = () => {
  // const [group, setGroup] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading }: any = useLoading();

  //get data from Redux store
  const group = useSelector((state: any) => state.group);

  useEffect(() => {
    const fetchGroup = async () => {
      await getAllGroup(dispatch, toast, navigate);
      setLoading(false);
    };
    fetchGroup();
    // console.log(group);}
  }, []);

  return (
    <DepartmentMain>
      <Row>
        {group.allGroup.map((group: any) => {
          const { groupId, groupName, managers, postIds, usernames } = group;
          return (
            <Col key={groupId} xl="5" sm="6">
              <div className="department-card">
                <Card onClick={() => navigate("/department/" + groupId)}>
                  <Card.Header className="department-name">
                    {groupName}
                  </Card.Header>
                  <Card.Body>
                    <h6 className="d-flex gap-1">
                      Manager:
                      {managers.map((manager: any) => (
                        <Badge key={manager} pill bg="secondary">
                          {manager}
                        </Badge>
                      ))}
                    </h6>
                    <h6 className="d-flex gap-1">
                      Posts:
                      <Badge key="numberOfPosts" pill bg="secondary">
                        {postIds.length}
                      </Badge>
                    </h6>
                    <h6 className="d-flex gap-1">
                      Members:
                      <Badge key="numberOfMembers" pill bg="secondary">
                        {usernames.length}
                      </Badge>
                    </h6>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          );
        })}
      </Row>
    </DepartmentMain>
  );
};

export default MyDepartment;
