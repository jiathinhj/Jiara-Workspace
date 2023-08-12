import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { isLoggingIn } from "../redux/authSlice";
// import { saveLogin } from "../redux/authSlice";

const Authorization = ({ children }: any) => {
  const dispatch = useDispatch();

  const authToken = localStorage.getItem("authToken");
  axios.defaults.headers.common["authToken"] = authToken;
  axios.defaults.headers.common["content-type"] = "Application/json";

  const handleCurrentUser = () => {
    if (localStorage.getItem("currentUser")) {
      const currentUser: any = localStorage.getItem("currentUser");
      dispatch(isLoggingIn(JSON.parse(currentUser)));
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return authToken ? <>{children}</> : <Navigate to={"/login"} />;
};
export default Authorization;
