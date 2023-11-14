import React, { useEffect, useMemo } from "react";
import {
  WeavyProvider,
  WeavyClient,
  MessengerProvider,
} from "@weavy/uikit-react";
import { useDarkMode } from "../Context/ThemeContext";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

const WeawyChat = ({ children }: any) => {
  const { isDark } = useDarkMode();
  const axiosPrivate = useAxiosPrivate();

  const weavyClient = useMemo(
    () =>
      new WeavyClient({
        url: "https://f1746aae94594612865d8f61eb9291e7.weavy.io",
        tokenFactory: async () => {
          const accessToken = await axiosPrivate({
            method: "get",
            url: "/messages",
          }).then((response: any) => {
            return response?.data.accessToken;
          });
          return accessToken;
        },
      }),
    []
  );

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("wy-dark");
    } else {
      document.body.classList.remove("wy-dark");
    }
    // Set initial dark mode
  }, [isDark]);

  return (
    <>
      {weavyClient ? (
        <WeavyProvider client={weavyClient}>{children}</WeavyProvider>
      ) : null}
    </>
  );
};

export default WeawyChat;
