import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import queryClient from "./api/queryClient";
import FloatingSupportButton from "./components/FloatingSupportButton";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
// import "./mocks/index";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Outlet />
        <FloatingSupportButton />
      </ThemeProvider>
      <ReactQueryDevtools
        initialIsOpen={false}
        buttonPosition={"bottom-left"}
      />
    </QueryClientProvider>
  );
}

export default App;
