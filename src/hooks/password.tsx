import { useState, useEffect } from "react";

import { PASSWORD_REGEX } from "../api/user.ts";

export function usePasswordValidation() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isConfirmPasswordError, setIsConfirmPasswordError] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (password === "") {
      setIsPasswordError(false);
    } else {
      setIsPasswordError(!PASSWORD_REGEX.test(password));
    }

    if (confirmPassword === "") {
      setIsConfirmPasswordError(false);
    } else {
      setIsConfirmPasswordError(password !== confirmPassword);
    }
  }, [isPasswordFocused, isConfirmPasswordFocused]);

  useEffect(() => {
    setIsButtonDisabled(
      password === "" ||
        confirmPassword === "" ||
        !PASSWORD_REGEX.test(password) ||
        password !== confirmPassword
    );
  }, [password, confirmPassword]);

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    isPasswordFocused,
    setIsPasswordFocused,
    isConfirmPasswordFocused,
    setIsConfirmPasswordFocused,
    isPasswordError,
    isConfirmPasswordError,
    isButtonDisabled,
  };
}
