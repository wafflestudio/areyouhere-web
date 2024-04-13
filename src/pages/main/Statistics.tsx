import styled from "styled-components";

import TitleBar from "../../components/TitleBar.tsx";

function Statistics() {
  return (
    <Container>
      <TitleBar label="Statistics" />
      <ContentContainer>
        <h3>Coming soon</h3>
        <p>We’re currently working hard on this page.</p>
        <p>Stay tuned for update!</p>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20rem;

  & h3 {
    ${({ theme }) => theme.typography.h3};
    color: ${({ theme }) => theme.colors.primary[500]};

    margin-bottom: 0.8rem;
  }

  & p {
    ${({ theme }) => theme.typography.b1};
  }
`;

export default Statistics;
