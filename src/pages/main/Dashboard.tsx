import styled from "styled-components";

import TitleBar from "../../components/TitleBar.tsx";

function Dashboard() {
  return (
    <Container>
      <TitleBar label="Class Title" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default Dashboard;
