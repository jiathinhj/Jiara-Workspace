import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = "https://jiara-workspace-server.onrender.com";

export const postAPI = async ({
  path,
  body,
}: {
  path: string;
  body: Object | String | Array<string>;
}) => {
  const getToken = localStorage.getItem("authToken");
  try {
    const apiRes = await axios.post(path, body, {
      headers: {
        authToken: `${getToken}`,
      },
    });
    return apiRes;
  } catch (error: any) {
    if (error && error.response.status === 422) {
      toast.error("Password incorrect");
    } else {
      toast.error("Please try again!");
    }
    console.log(error);
  }
};

export const getAPI = async (path: string) => {
  const getToken = localStorage.getItem("authToken");
  try {
    const apiRes = await axios.get(`${path}`, {
      headers: {
        authToken: `${getToken}`,
      },
    });
    console.log(apiRes);
    return apiRes;
  } catch (error: any) {
    toast.error("Please try again!");
  }
};

export const apiResquest = async ({
  method,
  url,
  data,
  successMessage,
}: {
  method: string;
  url: string;
  data: {};
  successMessage: string;
}) => {
  try {
    const getToken = localStorage.getItem("authToken");
    const apiRes = await axios({
      method,
      url,
      data,
      headers: {
        authToken: `${getToken}`,
      },
    });
    toast.success(successMessage);
    console.log(apiRes);
    return apiRes;
  } catch (error: any) {
    toast.error("Please try again!");
    return error;
  }
};
