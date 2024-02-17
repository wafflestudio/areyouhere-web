import styled from "styled-components";

import TitleBar from "../../components/TitleBar.tsx";

function Attendees() {
  return (
    <Container>
      <TitleBar label="Attendees" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Attendees;
