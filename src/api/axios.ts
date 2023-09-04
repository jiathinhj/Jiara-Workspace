import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "https://jiara-workspace-server.onrender.com";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: "https://jiara-workspace-server.onrender.com",
});

axiosPrivate.interceptors.request.use(
  (config) => {
    if (!config.headers["authToken"]) {
      const accessToken = localStorage.getItem("authToken");
      config.headers["authToken"] = accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPrivate.interceptors.response.use(
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
    } 
    return Promise.reject(error);
  }
);
