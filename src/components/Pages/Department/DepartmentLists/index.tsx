import { Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DepartmentMain from "../../../../Pages/Department";
import { useQuery } from "react-query";
import { getAllGroupSuccess } from "../../../../Redux/GroupSlice";
import Preloader from "../../../Preloader";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";

const DepartmentLists = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  //get data from Redux store
  const group = useSelector((state: any) => state.group);

  const fetchGroup = async () => {
    return await axiosPrivate({ method: "get", url: "/groups" });
  };

  const { isLoading } = useQuery("groups", fetchGroup, {
    onSuccess: (data) => {
      dispatch(getAllGroupSuccess(data.data.groups));
    },
  });

  return (
    <DepartmentMain>
      {isLoading ? (
        <Preloader />
      ) : (
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
                    <div className="department-info">
                      Tasks:
                      <Badge key="numberOfTasks" pill>
                        {`3`}
                      </Badge>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </DepartmentMain>
  );
};

export default DepartmentLists;
