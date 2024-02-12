import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import queryClient from "./api/queryClient";
import SideBar from "./components/SideBar.tsx";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
import "./mocks/user";

function App() {
  // 전역으로 관리 예정
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        {isSignedIn ? (
          <Container>
            <SideBar />
            <Outlet />
          </Container>
        ) : (
          <Outlet />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const Container = styled.div`
  padding-left: 8.2rem;
`;

export default App;
