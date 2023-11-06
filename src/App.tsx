import React from "react";

import "./Styles/globals.scss";
import { ThemeProvider } from "./Components/Context/ThemeContext";
import { CurrentUserProvider } from "./Components/Context/CurrentUserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Routes";
import WeawyChat from "./Components/WeawyChat";
import { MessengerProvider } from "@weavy/uikit-react";

function App() {
  const queryClient = new QueryClient();
  try {
    console.error();
  } catch (error) {
    console.log("error");
  }

  return (
    <>
      <ThemeProvider>
        <CurrentUserProvider>
          <QueryClientProvider client={queryClient}>
            <WeawyChat>
              <MessengerProvider>
                <Router />
              </MessengerProvider>
            </WeawyChat>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
