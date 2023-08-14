import React, { useContext } from "react";
import { ThemeContext, useDarkMode } from "./ThemeContext";
import { Switch } from "antd";

export const DarkModeToggle = () => {
  const { isDark, themeToggler }: any = useDarkMode();
  console.log(isDark);

  return (
    <Switch
      checkedChildren={"🌙"}
      unCheckedChildren={"🔆"}
      defaultChecked={isDark}
      onClick={themeToggler}
    />
  );
};
