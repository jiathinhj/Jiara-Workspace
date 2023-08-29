import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
// import { useMediaQuery } from "react-responsive";

export const ThemeContext = createContext({
  isDark: true,
  setIsDark: () => {},
  themeToggler: () => {},
});

export function ThemeProvider({ children }: any) {
  const [isDark, setIsDark] = useState(true);

  const value: any = { isDark, setIsDark };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export const useDarkMode = () => {
  const { isDark, setIsDark }: any = useContext(ThemeContext);

  const localTheme: any = localStorage.getItem("theme");

  const theme = useMemo(
    () =>
      localTheme && localTheme === "dark"
        ? isDark === true
          ? "dark"
          : "dark"
        : "light",
    [localTheme, isDark]
  );
  const themeToggler = () => {
    if (isDark === true) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      setIsDark(true);
    } else {
      document.body.classList.remove("dark");
      setIsDark(false);
    }
  }, [theme]);
  return { isDark, themeToggler };
};
