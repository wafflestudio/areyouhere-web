import styled from "styled-components";

import TitleBar from "../../components/TitleBar.tsx";

function Settings() {
  return (
    <Container>
      <TitleBar label="Settings" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Settings;
