import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../components/context/currentUser";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/axios";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const { setUser }: any = useContext(CurrentUserContext);

  // const checkAuth = async () => {
  //   try {
  //     await axiosPrivate.get("/groups");
  //     console.log("auth successful");
  //   } catch (error) {
  //     navigate("/login", { state: { from: location }, replace: true });
  //     console.log("auth error");
  //   }
  // };
  useEffect(() => {
    // checkAuth();
    setUser();
  }, []);
  return <>{children}</>;
};

export default Auth;
