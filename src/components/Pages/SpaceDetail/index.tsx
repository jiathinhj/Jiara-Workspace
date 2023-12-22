import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CurrentUserContext } from "../../Context/CurrentUserContext";
import { useQuery } from "react-query";
import {
  getGroupByIdSuccess,
  getMemberStatus,
} from "../../../Redux/Slice/groupSlice";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import {
  ChatBubbleBottomCenterIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import Tabs from "../../Tabs/Tabs";
import DiscussionsTab from "./SpaceTabs/DiscussionsTab/DiscussionsTab";
import MembersTab from "./SpaceTabs/MembersTab/MembersTab";

const tabItems = [
  {
    label: "Discussions",
    value: "discussions",
    icon: <ChatBubbleBottomCenterIcon />,
    children: <DiscussionsTab />,
  },
  {
    label: "Members",
    value: "members",
    icon: <UserGroupIcon />,
    children: <MembersTab />,
  },
];

const SpaceDetail = () => {
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
    <>
      <Tabs data={tabItems} />
    </>
  );
};

export default SpaceDetail;
