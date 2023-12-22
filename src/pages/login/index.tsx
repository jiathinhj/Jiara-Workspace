import React, { useState } from "react";

import { Google } from "react-bootstrap-icons";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../logo.png";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Avatar,
} from "@material-tailwind/react";
import SignUp from "../../Components/Modals/SignUpModal";
import InputWrapper from "../../Components/Form/InputWrapper";
import { setLoading } from "../../Redux/Slice/globalSlice";
import { loginUser } from "../../Apis/requests";

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

  const [openSignUp, setOpenSignUp] = useState<boolean>(false);

  const openSignUpHandler = () => {
    setOpenSignUp(true);
  };
  const closeSignUpHandler = () => {
    setOpenSignUp(false);
  };

  const onLogin = async (values: any) => {
    console.log(values);
    const account = values;
    try {
      setLoading(true);
      await loginUser(account, dispatch);
      navigate(from, { replace: true });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onLogin}
      >
        <Form>
          <div className="flex justify-center mt-[20vh]">
            <Card className="w-96">
              <CardHeader
                variant="gradient"
                className="mb-4 grid h-28 place-items-center bg-gray-900"
              >
                <Typography variant="h3" color="white">
                  <Avatar src={logo} size="sm" /> Welcome!
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col gap-4">
                <InputWrapper name="username" label="Username" size="lg" />
                <InputWrapper
                  name="password"
                  type="password"
                  label="Password"
                  size="lg"
                />
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" fullWidth type="submit">
                  Sign In
                  {/* {newActivityRes.loading || updateActivityRes.loading ? (
                    <BeatLoader color="#d0914e" />
                  ) : (
                    <span>{activityForm.isNew ? "Create" : "Update"}</span>
                  )} */}
                </Button>
                <Typography
                  variant="small"
                  className="mt-6 flex justify-center"
                >
                  Don&apos;t have an account?
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
                    onClick={openSignUpHandler}
                  >
                    Sign up
                  </Typography>
                </Typography>
              </CardFooter>
            </Card>
          </div>
        </Form>
      </Formik>

      <SignUp openSignUp={openSignUp} closeSignUpHandler={closeSignUpHandler} />
    </>
  );
};

export default Login;
