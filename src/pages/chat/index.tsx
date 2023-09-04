import React, { useEffect } from "react";
import { WeavyProvider, WeavyClient, Messenger } from "@weavy/uikit-react";
import { useDarkMode } from "../../components/context/theme";
import { apiRequest } from "../../api";
import useAxiosPrivate from "../../components/hooks/useAxiosPrivate";

const ChatBox = () => {
  const { isDark } = useDarkMode();
  const axiosPrivate = useAxiosPrivate();

  const weavyClient = new WeavyClient({
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
  });

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
      <WeavyProvider client={weavyClient}>
        <Messenger />
      </WeavyProvider>
    </>
  );
};

export default ChatBox;
