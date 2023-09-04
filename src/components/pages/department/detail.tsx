import React, { useContext, useEffect, useState } from "react";

import { Tabs, Tab, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import MemberTab from "./members";
import FeedTab from "./feed";
import DepartmentMain from "../../../pages/department";
import { CurrentUserContext } from "../../context/currentUser";
import { useQuery } from "react-query";
import {
  getGroupByIdSuccess,
  getMemberStatus,
} from "../../../redux/groupSlice";
import Preloader from "../../preloader";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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
        <div className="group-detail position-relative">
          <Tabs
            className="group-area"
            activeKey={tab}
            onSelect={(eventKey: any) => setTab(eventKey)}
          >
            <Tab eventKey="discussion" title="Discussion">
              <FeedTab />
            </Tab>
            <Tab eventKey="member" title="Member">
              <MemberTab />
            </Tab>
            <Tab disabled title={data?.data.groupName || ""} />
          </Tabs>
        </div>
      )}
    </DepartmentMain>
  );
};

export default DepartmentDetail;
