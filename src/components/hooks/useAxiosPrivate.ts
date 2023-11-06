import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../Api/axios";
import { toast } from "react-toastify";

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["authToken"]) {
          const accessToken = localStorage.getItem("authToken");
          config.headers["authToken"] = accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          console.log(prevRequest.sent);
          console.log(error);
          //     // refresh accessToken
          //     // const newAccessToken = await refresh();
          //     // prevRequest.headers['authToken'] = `${newAccessToken}`;
          //     // return axiosPrivate(prevRequest);
          //   }
        } else if (error?.response?.status === 401) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          toast.error("Your login session has expired! Please login again!");
          navigate("/login", { state: { from: location }, replace: true });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          toast.error("Please try again!");
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
          toast.error("Please try again!");
        }
        console.log(error.config);
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
      axiosPrivate.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;
