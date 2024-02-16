import styled from "styled-components";

import TitleBar from "../../components/TitleBar";

function SessionDetail() {
  return (
    <Container>
      <TitleBar label="Sessions" />
      <Divider />
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

const Divider = styled.div`
  width: calc(100% - 7rem);
  border-top: ${({ theme }) => theme.colors.grey} 1px solid;
  margin: 2.1rem 2.9rem 3.3rem 4.1rem;
`;

const SessionInfoBar = styled.div`
  width: 100%;
  display: flex;
  ${({ theme }) => theme.typography.h5};
  padding: 0 6.3rem;
  justify-content: space-between;
`;

export default SessionDetail;
