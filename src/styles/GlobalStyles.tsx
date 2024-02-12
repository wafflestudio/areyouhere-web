import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
    font-size: 62.5%;
  }
  
	body, button, input, select, textarea {
		font-family: 'Lato', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
