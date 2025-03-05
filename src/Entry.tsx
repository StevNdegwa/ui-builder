import { useLayoutEffect } from "react";
import { Dashboard } from "@ui/components/pages";
import { GlobalStyle, ThemeProvider } from "@ui/styles";
import { App } from "@app/index";
import "@modules/controls";

export default function Entry() {
  useLayoutEffect(() => {
    App.init();
    console.log("App initialized");
  }, []);

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Dashboard />
    </ThemeProvider>
  );
}
