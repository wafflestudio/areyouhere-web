import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import sendIcon from "../assets/send.svg";
import TransferBanner from "../components/admin/TransferBanner.tsx";
import Alert from "../components/Alert.tsx";
import { PrimaryButton } from "../components/Button.tsx";
import TextField from "../components/TextField";

function Home() {
  const navigate = useNavigate();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");

  const [hasError, setHasError] = useState(false);

  return (
    <Container>
      <TransferBanner from="attendees" />
      <TimeDisplay>
        <TimeLabel>TODAY</TimeLabel>{" "}
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </TimeDisplay>
      <LoginContainer>
        <BannerContainer>
          <BannerLabel>Host</BannerLabel>
          <BannerChatBubble>Are you here?</BannerChatBubble>
        </BannerContainer>
        <InputContainer
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: Send name and passcode to server
            if (passcode === "1234") {
              navigate("/result");
            } else {
              setHasError(true);
            }
          }}
        >
          <TextField
            type="text"
            autoComplete="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            type="text"
            placeholder="Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            style={{ marginTop: "1.1rem" }}
          />
          {hasError && (
            <Alert type="warning" style={{ marginTop: "2rem" }}>
              Could not find a session corresponding to your name and passcode.
              Please check your credentials or contact the administrator for
              help.
            </Alert>
          )}
          <PrimaryButton
            type="submit"
            style={{
              marginTop: "4.4rem",
              width: "11.5rem",
              marginLeft: "auto",
            }}
          >
            <img src={sendIcon} alt="Send" width={20} height={20} />
            Send
          </PrimaryButton>
        </InputContainer>
      </LoginContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TimeDisplay = styled.p`
  font-size: 1.6rem;
  color: #000000;
  margin-top: 9.8rem;
  margin-bottom: 4.8rem;
  font-weight: 500;
  text-align: center;
`;

const TimeLabel = styled.span`
  font-weight: bold;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 41rem;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 24.1rem;
`;

const BannerLabel = styled.p`
  font-size: 1.6rem;
  color: #646464;
  margin-left: 1.2rem;
  font-weight: 500;
`;

const BannerChatBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem 3.1rem 1.5rem 2.8rem;
  margin-top: 0.8rem;
  background-color: ${({ theme }) => theme.colors.lightGrey};

  font-size: 3rem;
  font-weight: 400;
  color: #000000;
  line-height: 3.6rem;
  border-radius: 0rem 2rem 2rem 2rem;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 2.9rem;
`;

export default Home;
