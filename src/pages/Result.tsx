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
  margin-top: 188px;
  margin-bottom: 40px;
  font-size: 36px;
  line-height: 43px;
  font-weight: bold;
  text-align: center;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 20px;
  border: 1px solid #e6e6e6;
  width: 448px;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 40px;

  & > p + p {
    margin-top: 28px;
  }
`;

const InfoLabel = styled.p`
  font-size: 16px;
  color: #4f4f4f;
  font-weight: 400;
  width: 100%;
`

const ConfirmButton = styled(SmallButton)`
  margin-top: 45px;
  width: 190px;
`;

export default Result;
