import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

import successIcon from "../../../assets/success.svg";
import { PrimaryButton } from "../../../components/Button.tsx";

function Success() {
  const navigate = useNavigate();

  const { email, isVerified, isPasswordSet } = useOutletContext<{
    email: string;
    isVerified: boolean;
    isPasswordSet: boolean;
  }>();

  // 직접 접근 차단
  useEffect(() => {
    if (email === "" || !isVerified || !isPasswordSet) {
      navigate("/host/forgot-password/email");
    }
  }, []);

  return (
    <>
      <img src={successIcon} alt="success" style={{ marginTop: "8.7rem" }} />
      <h1 style={{ marginTop: "2rem" }}>Reset Successfully</h1>
      <h2>Sign in into your account with your new password.</h2>
      <PrimaryButton
        onClick={() => {
          navigate("/host/signin");
        }}
        style={{ marginBottom: "1.5rem" }}
      >
        Sign In
      </PrimaryButton>
    </>
  );
}

export default Success;
