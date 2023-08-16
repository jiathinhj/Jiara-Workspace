import React, { useContext, useEffect, useState } from "react";

import { Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MemberTab from "./members";
import FeedTab from "./feed";
import DepartmentMain from "../../../pages/department";
import { useLoading } from "../../context/loading";
import { getGroupById } from "../../../redux/actions";
import { CurrentUserContext } from "../../context/currentUser";

const DepartmentDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("discussion");

  const dispatch = useDispatch();
  const { setLoading }: any = useLoading();

  //get data of current group from Redux
  const detailGroup = useSelector((state: any) => state.group.detailGroup);
  const { posts, groupName, managers, members, groupId } = detailGroup;

  //get data of current user from UserContext
  const { currentUser }: any = useContext(CurrentUserContext);
  

  const fetchGroupDetails = async () => {
    await getGroupById(id, dispatch).then(() => setLoading(false));
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
