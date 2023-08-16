import React from "react";
import Router from "./routes/Router";

import "./styles/globals.scss";
import { ThemeProvider } from "./components/context/theme";
import { CurrentUserProvider } from "./components/context/currentUser";
function App() {
  return (
    <>
      <ThemeProvider>
        <CurrentUserProvider>
          <Router />
        </CurrentUserProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
