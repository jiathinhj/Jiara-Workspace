import { useCallback, useEffect, useState } from "react";
import useAllAccounts from "./useAllAccounts";
import { useSelector } from "react-redux";

export const useProfile = (username: String) => {
  const [info, setInfo] = useState(null);
  const allUser = useSelector((state: any) => state.user.allUser);

  const getUserInfo = useCallback(
    (data: any) => {
      const queryResult = data.find((dt: any) =>
        dt.username.toLowerCase().includes(username)
      );
      return queryResult ? setInfo(queryResult) : setInfo(null);
    },
    [username]
  );

  useEffect(() => {
    allUser && getUserInfo(allUser);
  }, [allUser]);

  return { info };
};

//ignore this file
