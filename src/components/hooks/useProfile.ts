import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAccount } from "../../redux/apiRequests";

export const useProfile = (username: string) => {
  const dispatch = useDispatch();
  const accounts = useSelector((state: any) => state.user.allUser);
  const [info, setInfo] = useState<any>({});

  const handleGetAllAccounts = async () => {
    await getAllAccount(dispatch);
  };

  const getUserInfo = useCallback(() => {
    const queryResult =
      accounts !== null &&
      accounts.find((account: any) =>
        account.username.toLowerCase().includes(username)
      );

    setInfo(queryResult);
  }, []);

  useEffect(() => {
    handleGetAllAccounts();
    getUserInfo();
  }, []);

  return { info };
};
