import styled from "styled-components";

import TitleBar from "../../../components/TitleBar.tsx";

function SessionDetail() {
  return (
    <Container>
      <TitleBar label="Sessions" />
      <SessionInfoBar>
        <span>Session Name: </span>
        <span>Date 2024.01.01 </span>
      </SessionInfoBar>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SessionInfoBar = styled.div`
  width: 100%;
  display: flex;
  ${({ theme }) => theme.typography.h5};
  padding: 0 6.3rem;
  justify-content: space-between;
`;

export default SessionDetail;
