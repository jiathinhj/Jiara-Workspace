import { Col, Spinner } from "react-bootstrap";

import LeftSider from "../../layout/menu/LeftSider";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemberStatus } from "../../../redux/groupSlice";
import Preloader from "../../preloader/Preloader";
import { useLoading } from "../../preloader/LoadingContext";

const DepartmentMain = ({ children }: any) => {
  const dispatch = useDispatch();
  const { loading, setLoading }: any = useLoading();

  const group = useSelector((state: any) => state.group);
  const { detailGroup, isFetching } = group;
  const { managers } = detailGroup;

  //get data of current user from Redux
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  const handleMemberRole = async () => {
    //Show button add/remove members for managers and admin only
    if (
      (managers && managers.includes(currentUser.username)) ||
      (currentUser && currentUser.role === "admin")
    ) {
      dispatch(getMemberStatus(true));
    }
  };
  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    handleMemberRole();
  }, [currentUser]);

  return (
    <>
      <Col className="sider" xs={3}>
        <LeftSider />
      </Col>

      <Col xs={9} className="main-content department">
        {loading ? <Preloader /> : <>{children} </>}
      </Col>
    </>
  );
};

export default DepartmentMain;
