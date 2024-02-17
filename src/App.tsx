import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import queryClient from "./api/queryClient";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
import "./mocks/user";

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
