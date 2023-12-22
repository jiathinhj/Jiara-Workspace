import React, { useEffect } from "react";

const protectedRoute =
  ({ WrappedComponent, loginNeeded = true }: any) =>
  (props: any) => {
    const tryRedirect = (redirectTo: string) => {
      if (!(typeof window === "undefined")) {
        window.location.replace(redirectTo);
      }
    };

    const authToken = localStorage.getItem("authToken");
    const currentUser: any = localStorage.getItem("currentUser");
    const user = JSON.parse(currentUser);

    useEffect(() => {}, [authToken, user]);

    if (!authToken && loginNeeded) {
      // ex. visiting pages without signing in.
      tryRedirect("/login");
      console.log(authToken);
    }
    if (authToken && !loginNeeded) {
      // ex. visiting signin page after logging in.
      console.log(user, authToken);
      tryRedirect(`/department`);
    }
    if (authToken && loginNeeded) {
      // ex. visiting pages after signing in.
      return <WrappedComponent {...props} />;
    }

    if (!authToken && !loginNeeded) {
      // ex. visiting signin page without logging in.
      return <WrappedComponent {...props} />;
    }
  };

export default protectedRoute;
