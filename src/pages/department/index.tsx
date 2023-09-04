import { Col, Row } from "react-bootstrap";

import LeftSider from "../../components/layout/menu/left";

const DepartmentMain = ({ children }: any) => {
  return (
    <div className="toggler">
      <Row>
        <Col xs={3}>
          <LeftSider />
        </Col>
        <Col xs={12} sm={12} lg={9} xxl={9} className="main-content department">
          <>{children} </>
        </Col>
      </Row>
    </div>
  );
};

export default DepartmentMain;
