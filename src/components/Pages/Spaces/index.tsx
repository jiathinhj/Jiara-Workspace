import { Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DepartmentMain from "../../../Pages/Department";
import { useQuery } from "react-query";
import { getAllGroupSuccess } from "../../../Redux/Slice/groupSlice";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import CustomDropDown from "../../Dropdown/CustomDropDown";
import { ListItem, ListItemPrefix } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

const SpaceList = () => {
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
    <>
      {group.allGroup.map((group: any) => {
        const { groupId, groupName } = group;
        return (
          <ListItem
            onClick={() => navigate("/space/" + groupId)}
            className="text-ellipsis overflow-hidden max-w-[20rem]"
          >
            <ListItemPrefix>
              {<HeartIcon strokeWidth={3} className="h-3 w-5" />}
            </ListItemPrefix>
            {groupName}
          </ListItem>
        );
      })}
    </>
  );
};

export default SpaceList;
