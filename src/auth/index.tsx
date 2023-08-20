import React, { useContext, useEffect } from "react";
import { getAPI } from "../api";

import { CurrentUserContext } from "../components/context/currentUser";

const Auth = ({ children }: { children: React.ReactNode }) => {
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
