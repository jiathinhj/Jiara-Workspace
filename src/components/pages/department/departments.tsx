import { Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DepartmentMain from "../../../pages/department";
import { useQuery } from "react-query";
import { getAllGroupSuccess } from "../../../redux/groupSlice";
import Preloader from "../../preloader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const MyDepartment = () => {
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
                  </Card.Body>
                </Card>
              </div>
            );
          })}
        </div>
      )}{" "}
    </DepartmentMain>
  );
};

export default MyDepartment;
