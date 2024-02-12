import styled from "styled-components";
import TransferBanner from "../../components/TransferBanner";
import TextField from "../../components/TextField";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { OptionalActionLabel, OptionalActionLink } from "../../components/OptionalAction";

function SignIn() {
  return (
    <Container>
      <TransferBanner from="admin" />
      <LoginContainer>
        <DisplayMessage>
          Simply manage attendance<br/>for your seminars, meetings,<br/>and lectures
        </DisplayMessage>
        <InputContainer>
          <TextField type="text" name="email" autoComplete="username" label="Email address" />
          <TextField type="password" autoComplete="current-password" label="Password" style={{ marginTop: '14px' }} />
          <ForgotPasswordLink to="/admin/forgotpassword" style={{ marginTop: '14px' }}>
            Forgot Password
          </ForgotPasswordLink>
          <Button type="submit" style={{ marginTop: '30px' }}>Sign In</Button>
          <OptionalActionLabel style={{ marginTop: '50px' }}>
            Don't have an account? <OptionalActionLink to="/admin/signup">Sign up now</OptionalActionLink>
          </OptionalActionLabel>
        </InputContainer>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 147px;
  margin-left: 143px;
  margin-right: 146px;
`

const DisplayMessage = styled.p`
  font-size: 48px;
  line-height: 58px;
  color: #000000;
  font-weight: 800;
  flex: 1;
  margin-right: 100px;
  width: 607px;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 444px;
`;

const ForgotPasswordLink = styled(Link)`
  font-size: 16px;
  color: #4f4f4f;
  text-decoration: none;
  font-weight: 400;
  margin-left: auto;
`;

export default SignIn;
