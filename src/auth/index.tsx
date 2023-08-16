import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAPI } from "../api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const Auth = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      await getAPI("/groups");
    } catch (error: any) {
      if (error && error.response && error.response.status === 401) {
        console.log("error", error);
        toast.error("Your login session has expired! Please login again!");
        navigate("/login");
      } else toast.error("Failed to load the page, please try again");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return <>{children}</>;
};

export default Auth;
