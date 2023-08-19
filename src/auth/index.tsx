import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CurrentUserContext } from "../components/context/currentUser";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUser }: any = useContext(CurrentUserContext);

  const checkAuth = async () => {
    await getAPI("/groups");
  };
  useEffect(() => {
    checkAuth();
    setUser();
  }, []);

  return <>{children}</>;
};

export default Auth;
