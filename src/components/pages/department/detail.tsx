import React, { useContext, useEffect, useState } from "react";

import { Tabs, Tab, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MemberTab from "./members";
import FeedTab from "./feed";
import DepartmentMain from "../../../pages/department";
import { useLoading } from "../../context/loading";
import { getGroupById } from "../../../redux/actionReducer";
import { CurrentUserContext } from "../../context/currentUser";

const DepartmentDetail = () => {
  const { id } = useParams();
  const [tab, setTab] = useState("discussion");

  const dispatch = useDispatch();
  const { setLoading }: any = useLoading();

  //get data of current group from Redux
  const detailGroup = useSelector((state: any) => state.group.detailGroup);
  // const { posts, groupName, managers, members, groupId } = detailGroup;

  const fetchGroupDetails = async () => {
    await getGroupById(id, dispatch).then(() => setLoading(false));
  };

  useEffect(() => {
    fetchGroupDetails();
  }, []);

  return (
    <DepartmentMain>
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
          <Tab disabled title={detailGroup.groupName || ""} />
        </Tabs>
      </div>
    </DepartmentMain>
  );
};

export default DepartmentDetail;
