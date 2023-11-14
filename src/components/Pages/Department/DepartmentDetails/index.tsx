import React, { useContext, useEffect, useState } from "react";

import { Tabs, Tab, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import DepartmentMain from "../../../../Pages/Department";
import { CurrentUserContext } from "../../../Context/CurrentUserContext";
import { useQuery } from "react-query";
import {
  getGroupByIdSuccess,
  getMemberStatus,
} from "../../../../Redux/groupSlice";
import Preloader from "../../../Preloader";
import useAxiosPrivate from "../../../Hooks/useAxiosPrivate";
import DepartmentMembers from "./DepartmentTabs/DepartmentMembers";
import DepartmentFeed from "./DepartmentTabs/DepartmentFeed";

const DepartmentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [tab, setTab] = useState("discussion");

  //get data of current user from Redux
  const { currentUser }: any = useContext(CurrentUserContext);

  const handleMemberRole = (data: any) => {
    //Show button add/remove members for managers and admin only
    if (
      data?.managers?.includes(currentUser.username) ||
      (currentUser && currentUser.role === "admin")
    ) {
      dispatch(getMemberStatus(true));
    }
  };

  const fetchGroupDetails = async () => {
    return await axiosPrivate({
      method: "get",
      url: `/groups/${id}`,
    });
  };
  const { isLoading, data } = useQuery(
    ["groups-details", id],
    fetchGroupDetails,
    {
      onSuccess: (data) => {
        dispatch(getGroupByIdSuccess(data.data));
        handleMemberRole(data.data);
      },
      refetchOnWindowFocus: false,
    }
  );

  return (
    <DepartmentMain>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className="group-detail">
          <Tabs
            className="group-area"
            activeKey={tab}
            onSelect={(eventKey: any) => setTab(eventKey)}
          >
            <Tab eventKey="discussion" title="Discussion">
              <DepartmentFeed />
            </Tab>
            <Tab eventKey="member" title="Member">
              <DepartmentMembers />
            </Tab>
            {/* <Tab disabled title={data?.data.groupName || ""} /> */}
          </Tabs>
        </div>
      )}
    </DepartmentMain>
  );
};

export default DepartmentDetail;
