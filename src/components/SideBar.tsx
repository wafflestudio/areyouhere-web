import styled from "styled-components";

import Theme from "../styles/Theme.tsx";

function SideBar() {
  return <Container />;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;

  width: 8.2rem;
  height: 100vh;

  background-color: ${Theme.colors.darkGrey};
`;

export default SideBar;
