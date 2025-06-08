/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../../../../Udemy-Learning/React Course 2024/17-the-wild-oasis/src/hooks/useLocalStorageState";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(window.matchMedia("(prefers-color-scheme:dark)").matches, "isDarkMode");

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function ToggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return <DarkModeContext.Provider value={{ isDarkMode, ToggleDarkMode }}>{children}</DarkModeContext.Provider>;
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) throw new Error("DarkModeContext is used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
