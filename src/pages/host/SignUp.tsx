import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  EMAIL_REGEX,
  NAME_REGEX,
  sendSignInEmail,
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
import { usePasswordValidation } from "../../hooks/password.tsx";
import useSubmitHandler from "../../hooks/submitHandler.tsx";

function SignUp() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user } = useUser();

  // Name
  const [name, setName] = useState("");
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isNameError, setIsNameError] = useState(false);

  useEffect(() => {
    if (name === "") {
      setIsNameError(false);
    } else {
      setIsNameError(!NAME_REGEX.test(name));
    }
  }, [isNameFocused]);

  // Email
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const isEmailError = !EMAIL_REGEX.test(email);

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isVerificationCodeError, setIsVerificationCodeError] = useState(false);

  // Password
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setIsPasswordFocused,
    setIsConfirmPasswordFocused,
    isPasswordError,
    isConfirmPasswordError,
    isButtonDisabled,
  } = usePasswordValidation();

  // TODO: handle failure cases
  const { mutate: signUpMutate } = useMutation({
    mutationFn: signUp,
    mutationKey: ["signUp"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      // navigate("/class");
    },
  });

  const { mutate: sendSignInEmailMutate } = useMutation({
    mutationFn: sendSignInEmail,
    mutationKey: ["sendSignInEmail"],
    onSuccess: () => {
      setIsEmailSent(true);
    },
  });

  const { mutate: verifyEmailMutate } = useMutation({
    mutationFn: verifyEmail,
    mutationKey: ["verifyEmail"],
    onSuccess: () => {
      setIsVerificationCodeError(false);
      setIsVerified(true);
    },
    onError: () => {
      setIsVerificationCodeError(true);
    },
  });

  const { data: isEmailConflict } = useEmailConflict(email, !isEmailError);

  useEffect(() => {
    if (user != null) {
      navigate("/class");
    }
  }, [navigate, user]);

  const submit = () => {
    if (!isNameError && !isPasswordError && !isConfirmPasswordError) {
      signUpMutate({ name, email, password });
    }
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <Container>
      <TransferBanner from="host" />
      <Title>Create a Free Account</Title>
      <InputContainer
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(submit);
        }}
      >
        <TextField
          type="text"
          label="Name"
          maxLength={50}
          onFocus={() => {
            setIsNameFocused(true);
          }}
          onBlur={() => {
            setIsNameFocused(false);
          }}
          onChange={(e) => setName(e.target.value)}
          supportingText={
            isNameError ? "Name must be 2-16 characters long." : undefined
          }
          hasError={isNameError}
          value={name}
        />
        <EmailBar>
          <TextField
            style={{ flex: "1" }}
            autoComplete="email"
            type="email"
            label="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            supportingText={
              isEmailConflict ? "Email already exists." : undefined
            }
            hasError={isEmailConflict}
          />
          <PrimaryButton
            style={{
              height: "4.2rem",
              marginBottom: isEmailConflict ? "1.8rem" : "0.0rem",
            }}
            disabled={
              email === "" || isEmailError || isEmailConflict || isVerified
            }
            onClick={(e) => {
              e.preventDefault();
              sendSignInEmailMutate(email);
            }}
          >
            {isEmailSent ? "Resend" : "Send Code"}
          </PrimaryButton>
        </EmailBar>
        {isEmailSent && (
          <EmailBar>
            <TextField
              style={{ flex: "1" }}
              type="text"
              label="Verification code"
              onChange={(e) => setVerificationCode(e.target.value)}
              supportingText={
                isVerificationCodeError
                  ? "Invalid verification code."
                  : undefined
              }
              hasError={isVerificationCodeError}
            />
            <PrimaryButton
              style={{
                height: "4.2rem",
                marginBottom: isVerificationCodeError ? "1.8rem" : "0.0rem",
              }}
              disabled={verificationCode == "" || isVerified}
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
          type="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => {
            setIsPasswordFocused(true);
          }}
          onBlur={() => {
            setIsPasswordFocused(false);
          }}
          supportingText={
            "Password must be 8-20 characters long, including at least one letter, one number, and one special character."
          }
          hasError={isPasswordError}
          style={{ marginTop: "2.5rem" }}
        />
        <TextField
          type="password"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => {
            setIsConfirmPasswordFocused(true);
          }}
          onBlur={() => {
            setIsConfirmPasswordFocused(false);
          }}
          supportingText={
            isConfirmPasswordError ? "Passwords do not match." : undefined
          }
          hasError={isConfirmPasswordError}
          style={{ marginTop: "2.5rem" }}
        />
        <PrimaryButton
          style={{ marginTop: "3.0rem" }}
          disabled={
            !NAME_REGEX.test(name) ||
            !isVerified ||
            isButtonDisabled ||
            isSubmitting
          }
        >
          Sign Up
        </PrimaryButton>
        <OptionalActionLabel style={{ marginTop: "5.0rem" }}>
          Already a member?{" "}
          <OptionalActionLink to="/host/signin">Sign In</OptionalActionLink>
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
