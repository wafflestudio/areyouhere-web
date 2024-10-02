import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import TransferBanner from "../../../components/host/TransferBanner.tsx";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  return (
    <Container>
      <TransferBanner from="host" />
      <ContentContainer>
        <Outlet
          context={{
            email,
            setEmail,
            isVerified,
            setIsVerified,
            isPasswordSet,
            setIsPasswordSet,
          }}
        />
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 32rem;

  h1 {
    ${({ theme }) => theme.typography.h3};
    margin-top: 8.7rem;
    margin-bottom: 1.6rem;
    text-align: center;
  }

  h2 {
    ${({ theme }) => theme.typography.b4};
    color: ${({ theme }) => theme.colors.darkGrey};
    margin-bottom: 3rem;
    text-align: center;
  }

  div,
  input,
  button {
    width: 100%;
  }
`;

export default ForgotPassword;
