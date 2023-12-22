import React from "react";

import { CurrentUserProvider } from "./Components/Context/CurrentUserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Router from "./Routes";

function App() {
  const queryClient = new QueryClient();
  try {
    console.error();
  } catch (error) {
    console.log("error");
  }

  return (
    <>
      {/* <ThemeProvider> */}
      <CurrentUserProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </CurrentUserProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
