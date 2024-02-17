import styled from "styled-components";

import TitleBar from "../../components/TitleBar.tsx";

function Statistics() {
  return (
    <Container>
      <TitleBar label="Statistics" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Statistics;
