import React from "react";
import { ThemeProvider } from "./context";
import ScreenNavigation from "./ScreenNavigation";
import Title from "./Title";

const App = () => {
  return (
    <ThemeProvider>
      <Title />
      <ScreenNavigation />
    </ThemeProvider>
  );
};

export default App;
