import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import "./mocks/user";
import queryClient from "./api/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
