import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { PrimaryButton } from "../components/Button";

function Result() {
  const navigate = useNavigate();
  return (
    <Container>
      <Title>
        Thank you for the register!
        <br />
        We checked your attendance
      </Title>
      <InfoCard>
        <InfoLabel>Name</InfoLabel>
        <InfoLabel>Class / Session</InfoLabel>
        <InfoLabel>Sent Time</InfoLabel>
        <PrimaryButton
          style={{ width: "13rem", marginTop: "4rem" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Confirm
        </PrimaryButton>
      </InfoCard>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  margin-top: 18.8rem;
  margin-bottom: 4rem;
  ${({ theme }) => theme.typography.h2};
  text-align: center;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 2rem;
  border: 1px solid #e6e6e6;
  width: 44.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem 4rem;

  & > p + p {
    margin-top: 2.8rem;
  }
`;

const InfoLabel = styled.p`
  font-size: 1.6rem;
  color: #4f4f4f;
  font-weight: 400;
  width: 100%;
`;

export default Result;
