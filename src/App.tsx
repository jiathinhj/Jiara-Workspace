import React from "react";
import Router from "./routes/Router";

import "./styles/globals.scss";
import { ThemeProvider } from "./components/context/theme";
import { CurrentUserProvider } from "./components/context/currentUser";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <ThemeProvider>
        <CurrentUserProvider>
          <QueryClientProvider client={queryClient}>
            <Router />
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </CurrentUserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
