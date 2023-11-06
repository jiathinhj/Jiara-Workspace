import { createContext, useCallback, useState } from "react";

export const CurrentUserContext = createContext({});

export function CurrentUserProvider({ children }: any) {
  const [currentUser, setCurrentUser] = useState({});
  const setUser = useCallback(() => {
    const localUser: any = localStorage.getItem("currentUser");
    const parsedUser = JSON.parse(localUser);
    setCurrentUser(parsedUser);
  }, []);

  const contextValue = { currentUser, setUser };

  return (
    <CurrentUserContext.Provider value={contextValue}>
      {children}
    </CurrentUserContext.Provider>
  );
}
