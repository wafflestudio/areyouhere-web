import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PASSWORD_REGEX } from "../../../api/user.ts";
import { PrimaryButton } from "../../../components/Button.tsx";
import TextField from "../../../components/TextField.tsx";

function NewPassword() {
  const navigate = useNavigate();

  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isButtonAble, setIsButtonAble] = useState(false);

  useEffect(() => {
    if (password === "") {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(PASSWORD_REGEX.test(password));
    }

    if (confirmPassword === "") {
      setIsConfirmPasswordValid(true);
    } else {
      setIsConfirmPasswordValid(password === confirmPassword);
    }
  }, [isPasswordFocused, isConfirmPasswordFocused]);

  useEffect(() => {
    setIsButtonAble(
      password !== "" &&
        confirmPassword !== "" &&
        PASSWORD_REGEX.test(password) &&
        password === confirmPassword
    );
  }, [password, confirmPassword]);

  const onSubmit = () => {
    // TODO : 비밀번호 재설정 api 추가
    navigate("/host/forgot-password/success");
  };

  return (
    <>
      <h1>Set New Password</h1>
      <h2>
        Password must be 8-20 characters long, including at least one letter,
        one number, and one special character.
      </h2>
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={(e) => setpassword(e.target.value)}
        onFocus={() => {
          setIsPasswordFocused(true);
        }}
        onBlur={() => {
          setIsPasswordFocused(false);
        }}
        supportingText={
          !isPasswordValid
            ? "Password must be 8-20 characters long, including at least one letter, one number, and one special character."
            : undefined
        }
        hasError={!isPasswordValid}
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
          !isConfirmPasswordValid ? "Passwords do not match." : undefined
        }
        hasError={!isConfirmPasswordValid}
        style={{ marginBottom: "3rem" }}
      />
      <PrimaryButton
        disabled={!isButtonAble}
        onClick={onSubmit}
        style={{ marginBottom: "1.5rem" }}
      >
        Set New Password
      </PrimaryButton>
    </>
  );
}

export default NewPassword;
