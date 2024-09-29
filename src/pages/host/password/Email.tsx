import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { EMAIL_REGEX } from "../../../api/user.ts";
import { PrimaryButton, TertiaryButton } from "../../../components/Button.tsx";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../../components/host/OptionalAction.tsx";
import TextField from "../../../components/TextField.tsx";

function Email() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const emailError = email.match(EMAIL_REGEX) == null;

  const onSubmit = () => {
    // TODO : 이메일 전송 api 추가
    navigate("/host/forgot-password/verify");
  };

  return (
    <>
      <h1>Forgot password?</h1>
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
      />
      <PrimaryButton
        disabled={email === "" || emailError}
        onClick={onSubmit}
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
        <OptionalActionLink to="/host/signup">Sign up now</OptionalActionLink>
      </OptionalActionLabel>
    </>
  );
}

export default Email;
