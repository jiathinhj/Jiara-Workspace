import React, { useEffect } from "react";
import { getAPI } from "../../api";
// import { useChatScript } from "../../hooks/useChatScript";
import { WeavyProvider, WeavyClient, Messenger } from "@weavy/uikit-react";
import { useDarkMode } from "../../components/context/theme";

const ChatBox = () => {
  const { isDark } = useDarkMode();
  const weavyClient = new WeavyClient({
    url: "https://f1746aae94594612865d8f61eb9291e7.weavy.io",
    tokenFactory: async () => {
      const accessToken = await getAPI("/messages").then((response) => {
        return response?.data.accessToken;
      });
      console.log(accessToken);
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
