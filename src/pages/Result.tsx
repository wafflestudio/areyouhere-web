import styled from "styled-components";
import { SmallButton } from "../components/Button";

function Result() {
  return (
    <Container>
      <Title>Thank you for the register!<br />We checked your attendance</Title>
      <InfoCard>
        <InfoLabel>Name</InfoLabel>
        <InfoLabel>Class / Session</InfoLabel>
        <InfoLabel>Sent Time</InfoLabel>
        <ConfirmButton>Confirm</ConfirmButton>
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
  margin-bottom: 4.0rem;
  font-size: 3.6rem;
  line-height: 4.3rem;
  font-weight: bold;
  text-align: center;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 2.0rem;
  border: 1px solid #e6e6e6;
  width: 44.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem 4.0rem;

  & > p + p {
    margin-top: 2.8rem;
  }
`;

const InfoLabel = styled.p`
  font-size: 1.6rem;
  color: #4f4f4f;
  font-weight: 400;
  width: 100%;
`

const ConfirmButton = styled(SmallButton)`
  margin-top: 4.5rem;
  width: 19.0rem;
`;

export default Result;
