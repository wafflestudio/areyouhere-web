import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import SideBar from "./components/SideBar.tsx";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
<<<<<<< HEAD
import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import "./mocks/user";
import queryClient from "./api/queryClient";
=======
>>>>>>> 4c79253 (feat: add class page)

function App() {
  // 전역으로 관리 예정
  const [isSignedIn, setIsSignedIn] = useState(true);

  return (
<<<<<<< HEAD
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
=======
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
>>>>>>> 4c79253 (feat: add class page)
  );
}

const Container = styled.div`
  padding-left: 8.2rem;
`;

export default App;
