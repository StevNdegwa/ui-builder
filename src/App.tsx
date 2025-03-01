import { Dashboard } from "@components/pages/Dashboard";
import { GlobalStyle, ThemeProvider } from "@styles/index";

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
