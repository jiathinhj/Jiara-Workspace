import { Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DepartmentMain from "../../../../Pages/Department";
import { useQuery } from "react-query";
import { getAllGroupSuccess } from "../../../../Redux/groupSlice";
import Preloader from "../../../Preloader";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import CustomDropDown from "../../../Common/CustomDropDown";

const DepartmentSider = ({ clss }: any) => {
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
    <div className={`department-sider ${clss}`}>
      {group.allGroup.map((group: any) => {
        const { groupId, groupName, managers, postIds, usernames } = group;
        return (
          <div className="department" key={groupId}>
            <div onClick={() => navigate("/department/" + groupId)}>
              <div className="department-name">{groupName}</div>
            </div>
            <Badge bg="secondary" pill>
              {1}
            </Badge>
          </div>
        );
      })}
    </div>
  );
};

export default DepartmentSider;
