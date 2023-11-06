import { loginFailure, loginStart, loginSuccess } from "./AuthSlice";
import { apiRequest } from "../Api";
import { AppDispatch } from "./Store";
import { getAllGroupSuccess, getGroupByIdSuccess } from "./GroupSlice";
import { getAllUserSuccess } from "./UserSlice";

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
