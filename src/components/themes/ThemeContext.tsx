import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useMediaQuery } from "react-responsive";

export const ThemeContext = createContext({
  isDark: true,
  setIsDark: () => {},
  themeToggler: () => {},
});

export function ThemeProvider({ children }: any) {
  const [isDark, setIsDark] = useState(true);
  const themeToggler = () => {
    if (isDark === true) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
    console.log(isDark);
  };

  const value: any = { isDark, setIsDark, themeToggler };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useDarkMode = () => {
  const { isDark, setIsDark, themeToggler }: any = useContext(ThemeContext);
  useEffect(() => {
    const localTheme: any = localStorage.getItem("theme");
    if (localTheme && localTheme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    } else {
      document.body.classList.remove("dark");
      setIsDark(false);
    }
  }, [isDark]);
  return { isDark, themeToggler };
};
