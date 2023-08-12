import React from "react";

import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import "../../styles/Login.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import * as apis from "../../redux/apiRequest";

import logo from "../../appLogo.png";

const initialValues = {
  email: "",
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format!").required("Required!"),
  username: Yup.string().required("Required!"),
  password: Yup.string().required("Required!"),
});
//add more validationSchema here

const SignUp = ({ openSignUp, closeSignUpHandler }: any) => {
  //   const formik = useFormik({
  //     initialValues,
  //     onSubmit,
  //     validationSchema,
  //   });

  const onSubmit = (values: any) => {
    try {
      const body = values;
      const url = apis.apiURL.signup;
      axios
        .post(url, body)
        .then((response) => {
          console.log(response.data);
          //navigate to verify email page
          // navigate("/success");
        })
        .catch((err) => {
          console.log(err);
          //display error message
        });
    } catch (error) {
      console.log(error);
      // return ve trang xin loi, app crash
    }
  };

  return (
    <Modal
      dialogClassName="sign-up-form"
      show={openSignUp}
      onHide={closeSignUpHandler}
    >
      <Modal.Header closeButton={true}></Modal.Header>
      <Row className="sign-up d-flex justify-content-center align-items-center">
        <Col>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <Card
                className="login-form mx-auto my-0 "
                style={{
                  borderRadius: "1rem",
                  maxWidth: "1300px",
                  height: "900px",
                }}
              >
                <Row className="g-0">
                  <Col sm="5" className="">
                    <Card.Img src={logo} className="rounded-start" />
                    <div className="header">
                      REGISTER NOW TO JOIN YOUR COMMUNITY!
                    </div>
                  </Col>
                  <Col sm="7">
                    <Card.Body className=" p-3 w-100 d-flex flex-column">
                      <h2 className="fw-bold text-center">Sign Up</h2>
                      <Row>
                        <Col sm="3">
                          <label htmlFor="email">Email</label>
                        </Col>
                        <Col sm="9">
                          <Field
                            className="w-100"
                            id="email"
                            type="text"
                            size="lg"
                            name="email"
                          />
                          <div className="error-message">
                            {" "}
                            <ErrorMessage name="email" />{" "}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="3">
                          <label htmlFor="firstname">Firstname</label>
                        </Col>
                        <Col sm="9">
                          <Field
                            className="w-100"
                            id="firstname"
                            type="text"
                            size="lg"
                            name="firstname"
                          />
                          <div className="error-message">
                            {" "}
                            <ErrorMessage name="firstname" />{" "}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="3">
                          <label htmlFor="lastname">Lastname</label>
                        </Col>
                        <Col sm="9">
                          <Field
                            className="w-100"
                            id="lastname"
                            type="text"
                            size="lg"
                            name="lastname"
                          />
                          <div className="error-message">
                            {" "}
                            <ErrorMessage name="lastname" />{" "}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="3">
                          <label htmlFor="phoneNumber">Phone number</label>
                        </Col>
                        <Col sm="9">
                          <Field
                            className="w-100"
                            id="phoneNumber"
                            type="number"
                            size="lg"
                            name="phoneNumber"
                          />
                          <div className="error-message">
                            {" "}
                            <ErrorMessage name="phoneNumber" />{" "}
                          </div>
                        </Col>
                      </Row>
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
                            {" "}
                            <ErrorMessage name="username" />{" "}
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
                            {" "}
                            <ErrorMessage name="password" />{" "}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="3">
                          <label htmlFor="avatar">Avatar</label>
                        </Col>
                        <Col sm="9">
                          <Field
                            className="w-100"
                            id="avatar"
                            type="file"
                            size="lg"
                            name="avatar"
                          />
                          <div className="error-message">
                            {" "}
                            <ErrorMessage name="avatar" />{" "}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="3">
                          <label htmlFor="gender">Gender</label>
                        </Col>
                        <Col sm="9">
                          {/* <Field
                        className="w-100"
                        id="gender"
                        type="text"
                        size="lg"
                        name="gender"
                        as="radio"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field> */}
                          <div
                            role="group"
                            className="radio-group"
                            id="radio-group"
                          >
                            <label>
                              <Field type="radio" name="gender" value="male" />
                              Male
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="gender"
                                value="female"
                              />
                              Female
                            </label>
                          </div>
                          <div className="error-message">
                            {" "}
                            <ErrorMessage name="gender" />{" "}
                          </div>
                        </Col>
                      </Row>
                      <Button type="submit" className="btn-login" size="lg">
                        Register
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Modal>
  );
};

export default SignUp;
