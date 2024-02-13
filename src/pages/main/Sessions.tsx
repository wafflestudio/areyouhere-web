import styled from "styled-components";

import TitleBar from "../../components/TitleBar.tsx";

function Sessions() {
  return (
    <Container>
      <TitleBar label="Sessions" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Sessions;
