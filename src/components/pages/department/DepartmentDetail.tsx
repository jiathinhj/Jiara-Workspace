import React, { useEffect, useState } from "react";

import { Tabs, Tab } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getGroupById } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import MemberTab from "./MemberTab";
import FeedTab from "./FeedTab";
import DepartmentMain from ".";
import { useLoading } from "../../preloader/LoadingContext";

const DepartmentDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("discussion");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setLoading }: any = useLoading();

  //get data of current group from Redux
  const detailGroup = useSelector((state: any) => state.group.detailGroup);
  const { posts, groupName, managers, members, groupId } = detailGroup;

  //get data of current user from Redux
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  const fetchGroupDetails = async () => {
    await getGroupById(id, toast, dispatch, navigate);
    setLoading(false);
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [id]);

  return (
    <DepartmentMain>
      <div className="group-detail position-relative">
        <Tabs
          className="group-area"
          activeKey={tab}
          onSelect={(eventKey: any) => setTab(eventKey)}
        >
          <Tab eventKey="discussion" title="Discussion">
            <FeedTab
              posts={posts}
              groupId={groupId}
              currentAccount={currentUser}
            />
          </Tab>
          <Tab eventKey="member" title="Member">
            <MemberTab
              managers={managers}
              members={members}
              groupId={groupId}
            />
          </Tab>
          {/* <Tab eventKey="settings" title="Settings">
            <Profile />
          </Tab> */}
          <Tab disabled title={groupName || ""} />
        </Tabs>
      </div>
    </DepartmentMain>
  );
};

export default DepartmentDetail;
