import { GlobalStyle, ThemeProvider } from "@styles/index";

function App() {
  return (
    <ThemeProvider>
      <GlobalStyle />
      <h1>My App</h1>
    </ThemeProvider>
  );
}

export default App;
