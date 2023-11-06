import React, { useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";

import { Google } from "react-bootstrap-icons";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SignUp from "../../Components/Modals/SignUpModal";
import { loginUser } from "../../Redux/ApiRequests";

const initialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string()
    .min(6, "Username must be at least 6 characters long")
    .required("Required!"),
  password: Yup.string()
    // .matches(
    //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    //   "Invalid password format!"
    // )
    .required("Required!"),
});
const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const from = location.state?.from?.pathname || "/home";

  const auth = useSelector((state: any) => state.auth);

  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const openSignUpHandler = () => {
    setOpenSignUp(true);
  };
  const closeSignUpHandler = () => {
    setOpenSignUp(false);
  };

  const onLogin = async (values: any) => {
    const account = values;
    try {
      await loginUser(account, dispatch);
      navigate(from, { replace: true });
    } catch (error) {}
  };

  return (
    <Container fluid>
      <Row className="sign-in d-flex justify-content-center align-items-center h-100">
        <Col col="12">
          <Card
            className="login-form my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "600px" }}
          >
            <Card.Body className="p-5 w-100 d-flex flex-column">
              <h2 className="fw-bold text-center">Sign in</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onLogin}
              >
                <Form>
                  <Row>
                    <Col sm="3">
                      <label htmlFor="username">Username</label>
                    </Col>
                    <Col sm="9">
                      <Field
                        className="w-100"
                        id="username"
                        type="text"
                        size="lg"
                        name="username"
                      />
                      <div className="error-message">
                        <ErrorMessage name="username" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="3">
                      <label htmlFor="password">Password</label>
                    </Col>
                    <Col sm="9">
                      <Field
                        className="w-100"
                        id="password"
                        type="password"
                        size="lg"
                        name="password"
                      />
                      <div className="error-message">
                        <ErrorMessage name="password" />
                      </div>
                    </Col>
                  </Row>
                  {/* end form fields  */}
                  <Button type="submit" className="btn-login w-100" size="lg">
                    SIGN IN
                  </Button>
                </Form>
              </Formik>

              <hr className="my-4" />
              <Button className="btn-gg mb-2 w-100" size="lg">
                <Google /> Sign in with google
              </Button>
              <div className="sign-up-area">
                <p className="mb-0">
                  Don't have an account?
                  <button className="btn-sign-up" onClick={openSignUpHandler}>
                    Sign Up
                  </button>
                </p>
              </div>
              {/* end button group */}
              {/* {auth.error && <Alert variant={"danger"}>{auth.error}</Alert>} */}
            </Card.Body>
            {auth.isFetching && (
              <Spinner
                animation="border"
                style={{ color: "var(--Primary)", alignSelf: "center" }}
              />
            )}
          </Card>
        </Col>
      </Row>

      <SignUp openSignUp={openSignUp} closeSignUpHandler={closeSignUpHandler} />
    </Container>
  );
};

export default Login;
