import React from "react";
import { useQuery } from "react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useAllAccounts = (onSuccess: Function) => {
  const axiosPrivate = useAxiosPrivate();
  const getAllAccounts = async () => {
    return await axiosPrivate({
      method: "get",
      url: "/accounts",
    });
  };

  return useQuery("accounts", getAllAccounts, {
    select: (data) => {
      return data.data.data;
    },
    onSuccess: (data) => onSuccess(data),
    refetchOnWindowFocus: false,
  });
};

export default useAllAccounts;
