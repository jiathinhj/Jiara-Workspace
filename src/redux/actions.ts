import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { loginStart, loginSuccess } from "./authSlice";
import { getAPI, postAPI } from "../api";
import { AppDispatch } from "./store";
import { getAllGroupSuccess, getGroupByIdSuccess } from "./groupSlice";
import { getAllUserSuccess } from "./userSlice";

export const loginUser = async (
  account: Object,
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  dispatch(loginStart);
  await postAPI({ path: "/api/auth/login", body: account }).then((apiRes) => {
    dispatch(loginSuccess(apiRes?.data));
    console.log(apiRes?.data);
    navigate("/department");
  });
};

export const getAllGroup = async (dispatch: AppDispatch) => {
  await getAPI("/groups").then((apiRes: any) =>
    dispatch(getAllGroupSuccess(apiRes.data.groups))
  );
};

export const getGroupById = async (
  id: string | undefined,
  dispatch: AppDispatch
) => {
  await getAPI(`/groups/${id}`).then((apiRes: any) =>
    dispatch(getGroupByIdSuccess(apiRes.data))
  );
};

export const getAllAccount = async (dispatch: AppDispatch) => {
  const apiRes = await getAPI("/accounts");
  if (apiRes && apiRes.data) {
    dispatch(getAllUserSuccess(apiRes.data.data));
    console.log(apiRes.data.data);
    return apiRes.data.data;
  }
};
