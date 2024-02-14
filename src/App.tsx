import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import queryClient from "./api/queryClient";
import SideBar from "./components/SideBar.tsx";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
import "./mocks/user";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Container>
          <SideBar />
          <Outlet />
        </Container>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const Container = styled.div`
  padding-left: 8.2rem;
`;

export default App;
