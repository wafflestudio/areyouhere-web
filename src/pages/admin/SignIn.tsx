import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { EMAIL_REGEX, postSignIn } from "../../api/user";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../components/admin/OptionalAction";
import TransferBanner from "../../components/admin/TransferBanner";
import Alert from "../../components/Alert";
import { PrimaryButton } from "../../components/Button";
import TextField from "../../components/TextField";

function SignIn() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailError = email.match(EMAIL_REGEX) == null;
  const [showError, setShowError] = useState(false);

  const [resultError, setResultError] = useState<string | undefined>();

  // TODO: handle failure cases
  const { mutate } = useMutation({
    mutationFn: postSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/class");
    },
    onError: (error) => {
      setResultError(error.message);
    },
  });

  return (
    <Container>
      <TransferBanner from="admin" />
      <LoginContainer>
        <DisplayMessage>
          Simply manage attendance
          <br />
          for your seminars, meetings,
          <br />
          and lectures
        </DisplayMessage>
        <InputContainer
          onSubmit={(e) => {
            e.preventDefault();
            if (emailError) {
              setShowError(true);
              return;
            }
            mutate({ email, password });
          }}
        >
          <TextField
            type="text"
            name="email"
            autoComplete="username"
            label="Email address"
            onChange={(e) => setEmail(e.target.value)}
            supportingText={
              showError && emailError ? "Invalid email address" : undefined
            }
            hasError={showError && emailError}
          />
          <TextField
            type="password"
            autoComplete="current-password"
            label="Password"
            style={{ marginTop: "1.4rem" }}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ForgotPasswordLink
            to="/admin/forgotpassword"
            style={{ marginTop: "1.4rem" }}
          >
            Forgot Password
          </ForgotPasswordLink>
          {resultError && (
            <Alert type="error" style={{ marginTop: "1.2rem" }}>
              The email or password you entered is incorrect. Please try again.
            </Alert>
          )}
          <PrimaryButton type="submit" style={{ marginTop: "3.0rem" }}>
            Sign In
          </PrimaryButton>
          <OptionalActionLabel style={{ marginTop: "5.0rem" }}>
            Don't have an account?{" "}
            <OptionalActionLink to="/admin/signup">
              Sign up now
            </OptionalActionLink>
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
  justify-content: center;

  margin-top: 16.7rem;
`;

const DisplayMessage = styled.p`
  ${({ theme }) => theme.typography.h1};
  color: #000000;
  flex: 1;
  margin-right: 10rem;
  width: 60.7rem;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 32rem;
`;

const ForgotPasswordLink = styled(Link)`
  ${({ theme }) => theme.typography.b3};
  color: #4f4f4f;
  text-decoration: none;
  margin-left: auto;
`;

export default SignIn;
