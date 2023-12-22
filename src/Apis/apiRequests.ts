import { toast } from "react-toastify";
import { axiosPrivate } from "./axiosConfig";
import { Location } from "react-router-dom";

export const apiRequest = async ({
  method,
  url,
  data,
  successMessage,
  navigate,
  location,
}: {
  method: string;
  url: string;
  data?: {};
  successMessage?: string;
  navigate?: any;
  location?: Location;
}) => {
  try {
    const response = await axiosPrivate({
      method,
      url,
      data,
    });
    toast.success(successMessage);
    console.log(response);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
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
  }
};
