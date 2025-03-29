import { Dashboard } from "./Dashboard";
import { GlobalStyle, ThemeProvider } from "@ui/styles";
import { Builder } from "@modules/builder";

import "@modules/controls/Section/Section";
import "@modules/controls/Text/Text";

export default function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Dashboard>
        <Builder>
          <ui-section></ui-section>
          {/* <ui-section></ui-section>
          <ui-section></ui-section> */}
        </Builder>
      </Dashboard>
    </ThemeProvider>
  );
}
