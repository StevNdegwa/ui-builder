import { Dashboard } from "./Dashboard";
import { GlobalStyle, ThemeProvider } from "@ui/styles";
import { Builder } from "@modules/builder";

import "@modules/controls/Section/Section";

export default function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Dashboard>
        <Builder>
          <ui-section>
            <span slot="contents">Sample section to test</span>
          </ui-section>
          {/* <ui-section></ui-section>
          <ui-section></ui-section> */}
        </Builder>
      </Dashboard>
    </ThemeProvider>
  );
}
