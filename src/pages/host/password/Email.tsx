import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { EMAIL_REGEX, sendForgotPasswordEmail } from "../../../api/user.ts";
import { PrimaryButton, TertiaryButton } from "../../../components/Button.tsx";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../../components/host/OptionalAction.tsx";
import TextField from "../../../components/TextField.tsx";
import useSubmitHandler from "../../../hooks/submitHandler.tsx";

function Email() {
  const navigate = useNavigate();

  const { email, setEmail } = useOutletContext<{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
  }>();

  const isEmailError = !EMAIL_REGEX.test(email);
  const [isEmailExist, setIsEmailExist] = useState(true);

  const { mutate: sendForgotPasswordEmailMutate } = useMutation({
    mutationFn: sendForgotPasswordEmail,
    mutationKey: ["sendForgotPasswordEmail"],
    onSuccess: () => {
      setIsEmailExist(true);
      navigate("/host/forgot-password/verify");
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        setIsEmailExist(false);
      }
    },
  });

  const submit = () => {
    sendForgotPasswordEmailMutate(email);
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(submit);
      }}
    >
      <h1>Forgot Password?</h1>
      <h2>
        Please enter the email address you used when you joined and we’ll send
        you the verification code to reset password.
      </h2>
      <TextField
        type="text"
        name="email"
        label="Email Address"
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "3rem" }}
        supportingText={!isEmailExist ? "Email does not exist." : undefined}
        hasError={!isEmailExist}
      />
      <PrimaryButton
        disabled={email === "" || isEmailError || isSubmitting}
        style={{ marginBottom: "1.5rem" }}
      >
        Send Code
      </PrimaryButton>
      <TertiaryButton
        onClick={() => {
          navigate("/host/signin");
        }}
        style={{ marginBottom: "2rem" }}
      >
        Back
      </TertiaryButton>
      <OptionalActionLabel>
        Don't have an account?{" "}
        <OptionalActionLink to="/host/signup">Sign Up Now</OptionalActionLink>
      </OptionalActionLabel>
    </form>
  );
}

export default Email;
