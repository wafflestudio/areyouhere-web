import { useMutation } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import { setNewPassword } from "../../../api/user.ts";
import { PrimaryButton } from "../../../components/Button.tsx";
import TextField from "../../../components/TextField.tsx";
import { usePasswordValidation } from "../../../hooks/password.tsx";
import useSubmitHandler from "../../../hooks/submitHandler.tsx";

function NewPassword() {
  const navigate = useNavigate();

  const { email, isVerified, setIsPasswordSet } = useOutletContext<{
    email: string;
    isVerified: boolean;
    setIsPasswordSet: React.Dispatch<React.SetStateAction<boolean>>;
  }>();

  // 직접 접근 차단
  useEffect(() => {
    if (email == "" || !isVerified) {
      navigate("/host/forgot-password/email");
    }
  }, []);

  const {
    password,
    setPassword,
    setConfirmPassword,
    setIsPasswordFocused,
    setIsConfirmPasswordFocused,
    isPasswordError,
    isConfirmPasswordError,
    isButtonDisabled,
  } = usePasswordValidation();

  const { mutate: setNewPasswordMutate } = useMutation({
    mutationFn: setNewPassword,
    mutationKey: ["setNewPassword"],
    onSuccess: () => {
      setIsPasswordSet(true);
      navigate("/host/forgot-password/success");
    },
  });

  const submit = () => {
    setNewPasswordMutate({ email, password });
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(submit);
      }}
    >
      <h1>Set New Password</h1>
      <h2>
        Password must be 8-20 characters long, including at least one letter,
        one number, and one special character.
      </h2>
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        onFocus={() => {
          setIsPasswordFocused(true);
        }}
        onBlur={() => {
          setIsPasswordFocused(false);
        }}
        supportingText={
          isPasswordError
            ? "Password must be 8-20 characters long, including at least one letter, one number, and one special character."
            : undefined
        }
        hasError={isPasswordError}
        style={{ marginBottom: "1rem" }}
      />
      <TextField
        type="password"
        name="confirmPassword"
        label="Confirm Password"
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
        style={{ marginBottom: "3rem" }}
      />
      <PrimaryButton
        disabled={isButtonDisabled || isSubmitting}
        style={{ marginBottom: "1.5rem" }}
      >
        Set New Password
      </PrimaryButton>
    </form>
  );
}

export default NewPassword;
