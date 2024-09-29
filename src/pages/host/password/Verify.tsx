import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PrimaryButton, TertiaryButton } from "../../../components/Button.tsx";
import {
  OptionalActionLabel,
  OptionalActionLink,
} from "../../../components/host/OptionalAction.tsx";
import TextField from "../../../components/TextField.tsx";

function Verify() {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");

  const onSubmit = () => {
    // TODO : 코드 검증 api 추가
    navigate("/host/forgot-password/new-password");
  };

  return (
    <>
      <h1>Enter your code</h1>
      <h2>Please enter the code that we sent to your email address.</h2>
      <TextField
        type="text"
        name="verificationCode"
        label="Verification Code"
        onChange={(e) => setVerificationCode(e.target.value)}
        style={{ marginBottom: "3rem" }}
      />
      <PrimaryButton
        disabled={verificationCode === ""}
        onClick={onSubmit}
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
        <OptionalActionLink to="/host/forgot-password/email">
          Click to Resend
        </OptionalActionLink>
      </OptionalActionLabel>
    </>
  );
}

export default Verify;
