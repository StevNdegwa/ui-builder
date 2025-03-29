import { Dashboard } from "@ui/components/pages";
import { GlobalStyle, ThemeProvider } from "@ui/styles";
import { Builder } from "@modules/builder";

import "@modules/controls/Section/Section";

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
