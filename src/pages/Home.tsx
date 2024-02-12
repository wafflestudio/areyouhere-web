import styled from "styled-components";
import TransferBanner from "../components/TransferBanner";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import TextField from "../components/TextField";

function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const [name, setName] = useState("");
  const [passcode, setPasscode] = useState("");

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
            console.log(name, passcode);
            // TODO: Send name and passcode to server
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
            placeholder="Passcode (4-digit)"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
          />
          <Button type="submit">Send</Button>
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
  font-size: 16px;
  color: #000000;
  margin-top: 98px;
  margin-bottom: 48px;
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
  width: 444px;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 241px;
`;

const BannerLabel = styled.p`
  font-size: 16px;
  color: #646464;
  margin-left: 12px;
  font-weight: 500;
`;

const BannerChatBubble = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 31px 15px 28px;
  margin-top: 8px;
  background-color: ${({ theme }) => theme.colors.lightGrey};

  font-size: 30px;
  font-weight: 400;
  color: #000000;
  line-height: 36px;
  border-radius: 0px 20px 20px 20px;
`;

const InputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 37px;

  & > input {
    flex: 1;
  }

  & > input + input {
    margin-top: 14px;
  }

  & > button {
    margin-top: 37px;
    width: 158px;
    margin-left: auto;
  }
`;

export default Home;
