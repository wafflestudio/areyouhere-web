import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { verifyEmail } from "../../../api/user.ts";
import { PrimaryButton, TertiaryButton } from "../../../components/Button.tsx";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../../components/host/OptionalAction.tsx";
import TextField from "../../../components/TextField.tsx";
import useSubmitHandler from "../../../hooks/submitHandler.tsx";

function Verify() {
  const navigate = useNavigate();

  const { email, setEmail, setIsVerified } = useOutletContext<{
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    setIsVerified: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  // 직접 접근 차단
  useEffect(() => {
    if (email === "") {
      navigate("/host/forgot-password/email");
    }
  }, []);

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerificationCodeError, setIsVerificationCodeError] = useState(false);

  const { mutate: verifyEmailMutate } = useMutation({
    mutationFn: verifyEmail,
    mutationKey: ["verifyEmail"],
    onSuccess: () => {
      setIsVerificationCodeError(false);
      setIsVerified(true);
      navigate("/host/forgot-password/new-password");
    },
    onError: () => {
      setIsVerificationCodeError(true);
    },
  });

  const submit = () => {
    verifyEmailMutate({ email, code: verificationCode });
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(submit);
      }}
    >
      <h1>Enter Your Code</h1>
      <h2>Please enter the code that we sent to your email address.</h2>
      <TextField
        type="text"
        name="verificationCode"
        label="Verification Code"
        onChange={(e) => setVerificationCode(e.target.value)}
        supportingText={
          isVerificationCodeError ? "Invalid verification code." : undefined
        }
        hasError={isVerificationCodeError}
        style={{ marginBottom: "3rem" }}
      />
      <PrimaryButton
        disabled={verificationCode === "" || isSubmitting}
        style={{ marginBottom: "1.5rem" }}
      >
        Continue
      </PrimaryButton>
      <TertiaryButton
        onClick={() => {
          navigate("/host/signin");
        }}
        style={{ marginBottom: "2rem" }}
      >
        Back to Sign In
      </TertiaryButton>
      <OptionalActionLabel>
        Don’t receive the code?{" "}
        <OptionalActionLink
          to="/host/forgot-password/email"
          onClick={() => setEmail("")}
        >
          Click to Resend
        </OptionalActionLink>
      </OptionalActionLabel>
    </form>
  );
}

export default Verify;
