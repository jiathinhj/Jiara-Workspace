import { Col, Row, Spinner } from "react-bootstrap";

import LeftSider from "../../components/layout/menu/left";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemberStatus } from "../../redux/groupSlice";
import Preloader from "../../components/preloader";
import { useLoading } from "../../components/context/loading";
import { CurrentUserContext } from "../../components/context/currentUser";

const DepartmentMain = ({ children }: any) => {
  const dispatch = useDispatch();
  const { loading, setLoading }: any = useLoading();

  const group = useSelector((state: any) => state.group);
  const { detailGroup } = group;
  const { managers } = detailGroup;

  //get data of current user from Redux
  const { currentUser }: any = useContext(CurrentUserContext);

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
    <div className="toggler">
      <Row>
        <Col xs={3}>
          <LeftSider />
        </Col>
        <Col xs={12} sm={12} lg={9} xxl={9} className="main-content department">
          {loading ? <Preloader /> : <>{children} </>}
        </Col>
      </Row>
    </div>
  );
};

export default DepartmentMain;
