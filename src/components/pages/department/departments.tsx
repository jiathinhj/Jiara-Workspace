import { useEffect } from "react";
import { Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DepartmentMain from "../../../pages/department";
import { useLoading } from "../../context/loading";
import { getAllGroup } from "../../../redux/actionReducer";

const MyDepartment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setLoading }: any = useLoading();

  //get data from Redux store
  const group = useSelector((state: any) => state.group);

  useEffect(() => {
    const fetchGroup = async () => {
      await getAllGroup(dispatch);
      setLoading(false);
    };
    fetchGroup();
    // console.log(group);}
  }, []);

  return (
    <DepartmentMain>
      <div className="department-cards">
        {group.allGroup.map((group: any) => {
          const { groupId, groupName, managers, postIds, usernames } = group;
          return (
            <div className="department-card" key={groupId}>
              <Card onClick={() => navigate("/department/" + groupId)}>
                <Card.Header className="department-name">
                  {groupName}
                </Card.Header>
                <Card.Body>
                  <div className="department-info">
                    Manager:
                    {managers.map((manager: any) => (
                      <Badge key={manager} pill>
                        {manager}
                      </Badge>
                    ))}
                  </div>
                  <div className="department-info">
                    Posts:
                    <Badge key="numberOfPosts" pill>
                      {postIds.length}
                    </Badge>
                  </div>
                  <div className="department-info">
                    Members:
                    <Badge key="numberOfMembers" pill>
                      {usernames.length}
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </DepartmentMain>
  );
};

export default MyDepartment;
