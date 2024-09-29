import React from "react";
import { useNavigate } from "react-router-dom";

import successIcon from "../../../assets/success.svg";
import { PrimaryButton } from "../../../components/Button.tsx";

function Success() {
  const navigate = useNavigate();

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
