import styled from "styled-components";
import TransferBanner from "../../components/TransferBanner";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { OptionalActionLabel, OptionalActionLink } from "../../components/OptionalAction";

function SignUp() {
  return (
    <Container>
      <TransferBanner from="admin" />
      <Title>Create a free account</Title>
      <CenterContainer>
        <InputContainer>
          <TextField autoComplete="name" type="text" label="Name" />
          <TextField autoComplete="email" type="email" label="Email address" />
          <TextField
            autoComplete="new-password"
            type="password"
            label="Password"
          />
          <TextField
            autoComplete="new-password"
            type="password"
            label="Repeat password"
          />
        </InputContainer>
        <Button style={{ marginTop: '30px' }}>Sign up</Button>
        <OptionalActionLabel style={{ marginTop: '50px' }}>
          Already a member? <OptionalActionLink to="/admin/signin">Sign in</OptionalActionLink>
        </OptionalActionLabel>
      </CenterContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 800;
  line-height: 38px;

  margin-top: 111px;
  margin-bottom: 66px;
  text-align: center;
`;

const CenterContainer = styled.div`
  max-width: 444px;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default SignUp;
