import { DefaultTheme } from "styled-components";

const Theme: DefaultTheme = {
  colors: {
    black: "#000000",
    white: "#FFFFFF",

    lightGrey: "#F8F8F8",
    grey: "#D9D9D9",
    darkGrey: "#434343",

    primary: {
      "50": "#F1F2FF",
      "75": "#E6EBFD",
      "100": "#D4D9FF",
      "200": "#B5C1FF",
      "300": "#92AAFF",
      "400": "#6C94FF",
      "500": "#3479FF",
      "600": "#086BEE",
      "700": "#0058D1",
      "800": "#0046AD",
      "900": "#003585",
    },

    red: {
      "50": "#FFEEEA",
      "100": "#FFCBC3",
      "200": "#FFA99E",
      "300": "#FF877D",
      "400": "#FF6660",
      "500": "#F34648",
      "600": "#DA2935",
      "700": "#BD0E26",
      "800": "#9C001B",
      "900": "#780414",
    },

    green: {
      "50": "#E8F8E2",
      "75": "#FFCBC3",
      "100": "#B9EAAB",
      "200": "#89DA78",
      "300": "#55C847",
      "400": "#00B40D",
      "500": "#00D115",
      "600": "#008A00",
      "700": "#007400",
      "800": "#005D00",
      "900": "#004700",
    },
  },

  typography: {
    h1: "font-size: 4.8rem; font-weight: 800; line-height: 6rem;",
    h2: "font-size: 3.6rem; font-weight: 700; line-height: 4.8rem;",
    h3: "font-size: 3.2rem; font-weight: 800;",
    h4: "font-size: 2.4rem; font-weight: 700;",
    h5: "font-size: 2rem; font-weight: 700;",
    b1: "font-size: 1.6rem; font-weight: 400; line-height: 2.4rem;",
    b2: "font-size: 1.6rem; font-weight: 700; line-height: 2.4rem;",
    b3: "font-size: 1.4rem; font-weight: 400; line-height: 2.1rem;",
    b4: "font-size: 1.2rem; font-weight: 400; line-height: 1.8rem;",
    button1: "font-size: 1.4rem; font-weight: 600; line-height: 1.8rem;",
  },

  effects: {
    dropShadow:
      "0px 1px 2px 0px rgba(27, 35, 46, 0.08), 0px 2px 4px 0px rgba(22, 28, 38, 0.08)",
    blur: "0px 4px 20px 5px rgba(143, 143, 143, 0.1)",
  },
};

export default Theme;
