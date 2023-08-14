import React, { useEffect } from "react";
import Router from "./routes/Router";

import "./styles/globals.scss";
import { ThemeProvider, useDarkMode } from "./components/themes/ThemeContext";
function App() {
  // const { isDark, setIsDark }: any = useDarkMode();
  // useEffect(()=>{
  //   setIsDark(true)
  // })
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
