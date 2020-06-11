import React, { useState, createContext } from "react";

export const themeContext = createContext();

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState("light");

  return (
    <themeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </themeContext.Provider>
  );
};
