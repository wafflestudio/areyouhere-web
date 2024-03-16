import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  EMAIL_REGEX,
  NICKNAME_REGEX,
  PASSWORD_REGEX,
  signUp,
  useEmailConflict,
  useUser,
} from "../../api/user";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../components/admin/OptionalAction.tsx";
import TransferBanner from "../../components/admin/TransferBanner.tsx";
import { PrimaryButton } from "../../components/Button.tsx";
import TextField from "../../components/TextField.tsx";

function SignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nicknameError = nickname.match(NICKNAME_REGEX) == null;
  const emailError = email.match(EMAIL_REGEX) == null;
  const passwordError = password.match(PASSWORD_REGEX) == null;
  const confirmPasswordError = password !== confirmPassword;

  const [showError, setShowError] = useState(false);

  const { data: user } = useUser();

  // TODO: handle failure cases
  const { mutate } = useMutation({
    mutationFn: signUp,
    mutationKey: ["signUp"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // navigate("/class");
    },
  });

  const { data: isEmailConflict } = useEmailConflict(email, !emailError);

  useEffect(() => {
    if (user != null) {
      navigate("/class");
    }
  }, [navigate, user]);

  return (
    <Container>
      <TransferBanner from="admin" />
      <Title>Create a free account</Title>
      <InputContainer
        onSubmit={(e) => {
          e.preventDefault();

          if (
            nicknameError ||
            emailError ||
            passwordError ||
            confirmPasswordError
          ) {
            setShowError(true);
            return;
          }

          mutate({ nickname, email, password });
        }}
      >
        <TextField
          autoComplete="name"
          type="text"
          label="Name"
          onChange={(e) => setNickname(e.target.value)}
          supportingText={
            showError && nicknameError
              ? "Nickname must be 2-16 characters long"
              : undefined
          }
          hasError={showError && nicknameError}
        />
        <TextField
          autoComplete="email"
          type="email"
          label="Email address"
          style={{ marginTop: "2.5rem" }}
          onChange={(e) => setEmail(e.target.value)}
          supportingText={
            showError && emailError
              ? "Invalid email address"
              : isEmailConflict
                ? "Email already exists"
                : undefined
          }
          hasError={isEmailConflict || (showError && emailError)}
        />
        <TextField
          autoComplete="new-password"
          type="password"
          label="Password"
          style={{ marginTop: "2.5rem" }}
          onChange={(e) => setPassword(e.target.value)}
          supportingText={
            <span>
              Password must be at least 8 characters long,
              <br />
              with a letter, number, and special character.
            </span>
          }
          hasError={showError && passwordError}
        />
        <TextField
          autoComplete="new-password"
          type="password"
          label="Confirm password"
          style={{ marginTop: "2.5rem" }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          supportingText={
            showError && confirmPasswordError
              ? "Passwords do not match"
              : undefined
          }
          hasError={showError && confirmPasswordError}
        />
        <PrimaryButton
          style={{ marginTop: "3.0rem" }}
          disabled={
            nickname === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === ""
          }
        >
          Sign up
        </PrimaryButton>
        <OptionalActionLabel style={{ marginTop: "5.0rem" }}>
          Already a member?{" "}
          <OptionalActionLink to="/admin/signin">Sign in</OptionalActionLink>
        </OptionalActionLabel>
      </InputContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.p`
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 3.8rem;

  margin-top: 8.7rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const InputContainer = styled.form`
  max-width: 32rem;
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export default SignUp;
