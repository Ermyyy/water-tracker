
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme, DarkTheme } from "./app/theme";
import type { RootState } from "./app/store";

const ThemedApp = () => {
  const themeMode = useSelector((state: RootState) => state.ui.themeMode);
  const theme = themeMode === "light" ? lightTheme : DarkTheme;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
      <BrowserRouter>
        <ThemedApp />
      </BrowserRouter>
    </Provider>
);
