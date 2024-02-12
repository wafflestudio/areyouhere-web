import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

	body, button, input, select, textarea {
		font-family: 'Lato', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
