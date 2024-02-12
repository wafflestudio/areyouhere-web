import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";
import Theme from "./styles/Theme";
import { ThemeProvider } from "styled-components";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
