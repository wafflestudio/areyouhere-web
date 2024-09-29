import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  EMAIL_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  sendVerificationEmail,
  signUp,
  useEmailConflict,
  useUser,
  verifyEmail,
} from "../../api/user";
import { PrimaryButton } from "../../components/Button.tsx";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../components/host/OptionalAction.tsx";
import TransferBanner from "../../components/host/TransferBanner.tsx";
import TextField from "../../components/TextField.tsx";
import useSubmitHandler from "../../hooks/submitHandler.tsx";

function SignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verified, setVerified] = useState(false);

  const nameError = name.match(NAME_REGEX) == null;
  const emailError = email.match(EMAIL_REGEX) == null;
  const passwordError = password.match(PASSWORD_REGEX) == null;
  const confirmPasswordError = password !== confirmPassword;
  const [verificationCodeError, setVerificationCodeError] = useState(false);

  const [showError, setShowError] = useState(false);

  const { data: user } = useUser();

  // TODO: handle failure cases
  const { mutate: signUpMutate } = useMutation({
    mutationFn: signUp,
    mutationKey: ["signUp"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // navigate("/class");
    },
  });

  const { mutate: sendVerificationCodeMutate } = useMutation({
    mutationFn: sendVerificationEmail,
    mutationKey: ["sendVerificationCode"],
    onSuccess: () => {
      setSentEmail(true);
    },
  });

  const { mutate: verifyEmailMutate } = useMutation({
    mutationFn: verifyEmail,
    mutationKey: ["verifyEmail"],
    onSuccess: () => {
      setVerificationCodeError(false);
      setVerified(true);
    },
    onError: () => {
      setVerificationCodeError(true);
    },
  });

  const { data: isEmailConflict } = useEmailConflict(email, !emailError);

  useEffect(() => {
    if (user != null) {
      navigate("/class");
    }
  }, [navigate, user]);

  const submit = () => {
    if (nameError || passwordError || confirmPasswordError) {
      setShowError(true);
      return;
    }

    signUpMutate({ name, email, password });
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <Container>
      <TransferBanner from="host" />
      <Title>Create a free account</Title>
      <InputContainer
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submit);
        }}
      >
        <TextField
          autoComplete="name"
          type="text"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          supportingText={
            showError && nameError
              ? "Name must be 2-16 characters long"
              : undefined
          }
          hasError={showError && nameError}
        />
        <EmailBar>
          <TextField
            style={{ flex: "1" }}
            autoComplete="email"
            type="email"
            label="Email address"
            onChange={(e) => setEmail(e.target.value)}
            supportingText={
              isEmailConflict ? "Email already exists" : undefined
            }
            hasError={isEmailConflict}
          />
          <PrimaryButton
            style={{
              height: "4.2rem",
              marginBottom:
                (showError && emailError) || isEmailConflict
                  ? "1.8rem"
                  : "0.0rem",
            }}
            disabled={email === "" || emailError || isEmailConflict}
            onClick={(e) => {
              e.preventDefault();
              sendVerificationCodeMutate(email);
            }}
          >
            {sentEmail ? "Resend" : "Send Code"}
          </PrimaryButton>
        </EmailBar>
        {sentEmail && (
          <EmailBar>
            <TextField
              style={{ flex: "1" }}
              type="text"
              label="Verification code timer"
              onChange={(e) => setVerificationCode(e.target.value)}
              supportingText={
                verificationCodeError ? "Invalid verification code" : undefined
              }
              hasError={verificationCodeError}
            />
            <PrimaryButton
              style={{
                height: "4.2rem",
                marginBottom: verificationCodeError ? "1.8rem" : "0.0rem",
              }}
              disabled={verified}
              onClick={(e) => {
                e.preventDefault();
                verifyEmailMutate({ email, code: verificationCode });
              }}
            >
              Verify
            </PrimaryButton>
          </EmailBar>
        )}
        <TextField
          autoComplete="new-password"
          type="password"
          label="Password"
          style={{ marginTop: "2.5rem" }}
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
          supportingText={
            <span>
              Password must be 8-20 characters long, including at least one
              letter, one number, and one special character.
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
            name === "" ||
            email === "" ||
            password === "" ||
            confirmPassword === "" ||
            isSubmitting ||
            !verified
          }
        >
          Sign up
        </PrimaryButton>
        <OptionalActionLabel style={{ marginTop: "5.0rem" }}>
          Already a member?{" "}
          <OptionalActionLink to="/host/signin">Sign in</OptionalActionLink>
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

const EmailBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-top: 2.5rem;
  gap: 0.8rem;
`;

export default SignUp;