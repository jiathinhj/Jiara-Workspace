import { Location, NavigateFunction } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "./authSlice";
import { apiRequest } from "../api";
import { AppDispatch } from "./store";
import { getAllGroupSuccess, getGroupByIdSuccess } from "./groupSlice";
import { getAllUserSuccess } from "./userSlice";
import { AxiosResponse } from "axios";

export const loginUser = async (account: Object, dispatch: AppDispatch) => {
  dispatch(loginStart());
  await apiRequest({
    method: "post",
    url: "/api/auth/login",
    data: account,
  })
    .then((apiRes: any) => {
      dispatch(loginSuccess(apiRes?.data));
    })
    .catch(() => dispatch(loginFailure()));
};

export const getAllGroup = async (dispatch: AppDispatch) => {
  await apiRequest({ method: "get", url: "/groups" }).then((apiRes: any) => {
    dispatch(getAllGroupSuccess(apiRes.data.groups));
  });
};

export const getGroupById = async (
  id: string | undefined,
  dispatch: AppDispatch
) => {
  await apiRequest({
    method: "get",
    url: `/groups/${id}`,
  }).then((apiRes: any) => dispatch(getGroupByIdSuccess(apiRes.data)));
};

export const getAllAccount = async (dispatch: AppDispatch) => {
  await apiRequest({
    method: "get",
    url: "/accounts",
  }).then((apiRes: any) => {
    dispatch(getAllUserSuccess(apiRes.data.data));
    return apiRes.data.data;
  });
};
