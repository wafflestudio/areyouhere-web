import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {
<<<<<<< HEAD
    font-size: 62.5%;
  }

=======
      font-size: 62.5%; // 1rem = 10px
  }
  
>>>>>>> 4c79253 (feat: add class page)
	body, button, input, select, textarea {
		font-family: 'Lato', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
