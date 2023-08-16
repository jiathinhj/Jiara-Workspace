import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

export const CurrentUserContext = createContext({});

export function CurrentUserProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState({});

  // const value: any = { currentUser, setCurrentUser };

  console.log(currentUser);

  const setUser = useCallback(() => {
    const localUser: any = localStorage.getItem("currentUser");
    const parsedUser = JSON.parse(localUser);
    setCurrentUser(parsedUser);
  }, []);

  const contextValue = useMemo(
    () => ({
      currentUser,
      setUser,
    }),
    [currentUser, setUser]
  );

  useEffect(() => {
    setUser();
  }, []);

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
