import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./authSlice";
import {
  getGroupByIdSuccess,
  getAllGroupSuccess,
  getGroupStart,
  getGroupFailure,
} from "./groupSlice";
import { getAllUserSuccess, getUserFailure, getUserStart } from "./userSlice";

const serverUrl = "https://jiara-workspace-server.onrender.com";
// const serverUrl = "http://localhost:6969"

export const apiURL = {
  signup: serverUrl + "/api/auth/signup",
  login: serverUrl + "/api/auth/login",
  groups: serverUrl + "/groups",
  accounts: serverUrl + "/accounts",
  resetPassword: serverUrl + "/personal/resetPassword",
  personal: serverUrl + "/personal",
};

export const apiResquest = async ({
  method,
  url,
  data,
  toast,
  successMessage,
  navigate,
}) => {
  try {
    const res = await axios({ method, url, data });
    toast.success(successMessage);
    console.log(res);
    return res;
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      toast.error("Your login session has expired! Please login again!");
      navigate("/login");
      localStorage.clear();
    } else toast.error("Failed. Please try again!");
  }
};

export const postAPI = async (path, body) => {
  return await axios.post(path, body);
};

export const getAPI = async (path) => {
  try {
    const apiRes = await axios.get(`${path}`);
    return apiRes;
  } catch (error) {
    if (error && error.response && error.response.status === 401) {
      console.log(error.response.status);
    }
  }
};

export const loginUser = async (user, dispatch, navigate, toast) => {
  dispatch(loginStart());
  await axios
    .post(apiURL.login, user)
    .then((apiRes) => {
      dispatch(loginSuccess(apiRes.data));
      console.log(apiRes.data);
      navigate("/department");
    })
    .catch((error) => {
      if (error && error.response && error.response.status === 422) {
        dispatch(loginFailure());
        toast.error("Username or password incorrect");
      } else {
        toast.error("Login failed! Please try again!");
      }
      console.log(error);
    });
};

// const toastError = (error, toast, navigate) => {
//   if (error.response.status === 401) {
//     toast.error("Your login session has expired! Please login again!");
//     navigate("/login");
//   } else {
//     toast.error("Cannot load the requested page! Please try again!");
//   }
// };

export const getAllGroup = async (dispatch, toast, navigate) => {
  dispatch(getGroupStart());
  try {
    const apiRes = await axios.get(apiURL.groups);
    if (apiRes && apiRes.data) {
      dispatch(getAllGroupSuccess(apiRes.data.groups));
      return apiRes.data.groups;
    }
  } catch (error) {
    if (error && error.response && error.response.status) {
      dispatch(getGroupFailure(error.response.status));
    }
    if (error && error.response && error.response.status === 401) {
      toast.error("Your login session has expired! Please login again!");
      navigate("/login");
      localStorage.clear();
    }
    toast.error("Cannot load the requested page! Please try again!");
  }
};

export const getGroupById = async (id, toast, dispatch, navigate) => {
  dispatch(getGroupStart());
  try {
    const apiRes = await axios.get(`${apiURL.groups}/${id}`);
    if (apiRes && apiRes.data) {
      // console.log(apiRes.data);
      dispatch(getGroupByIdSuccess(apiRes.data));
      return apiRes.data;
    }
  } catch (error) {
    dispatch(getGroupFailure(error.response.status));
    if (error && error.response && error.response.status === 401) {
      toast.error("Your login session has expired! Please login again!");
      navigate("/login");
      localStorage.clear();
    }
    toast.error("Cannot load the requested page! Please try again!");
  }
};

export const getAllAccount = async (dispatch, toast, navigate) => {
  dispatch(getUserStart());
  try {
    const apiRes = await axios.get(apiURL.accounts);
    if (apiRes && apiRes.data) {
      // console.log(apiRes.data.data);
      dispatch(getAllUserSuccess(apiRes.data.data));
      console.log(apiRes.data.data);
      return apiRes.data.data;
    }
  } catch (error) {
    dispatch(getGroupFailure(error.response.status));
    if (error && error.response && error.response.status === 401) {
      toast.error("Your login session has expired! Please login again!");
      navigate("/login");
      localStorage.clear();
    }
    toast.error("Cannot load the requested page! Please try again!");
  }
};

export const getPostById = async (path, dispatch) => {
  try {
    const apiRes = await axios.get(path);
    return apiRes.data.postData;
  } catch (error) {
    return error.response.message;
  }
};
