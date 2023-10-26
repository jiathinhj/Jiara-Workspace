import { useState } from "react";
import useAllAccounts from "./useAllAccounts";

export const useProfile = (username: string) => {
  const [info, setInfo] = useState<any>({});

  const getUserInfo = (data: any) => {
    const queryResult = data.find((dt: any) =>
      dt.username.toLowerCase().includes(username)
    );
    return queryResult ? setInfo(queryResult) : undefined;
  };
  const { isLoading } = useAllAccounts(getUserInfo);

  return { info, isLoading };
};

//ignore this file