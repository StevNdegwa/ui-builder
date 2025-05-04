import { Dashboard } from "./Dashboard";
import { GlobalStyle, ThemeProvider } from "@ui/styles";
import { Builder } from "@modules/builder";

import { Toast } from "@ui/components";
import { useHandleNotification } from "./hooks/useHandleNotification";

export default function App() {
  const { showNotification, handleNotification, notificationMessage } =
    useHandleNotification();

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Dashboard>
        <Builder notify={handleNotification}>
          <ui-section></ui-section>
        </Builder>
        <Toast show={showNotification} title="Title">
          {notificationMessage}
        </Toast>
      </Dashboard>
    </ThemeProvider>
  );
}
