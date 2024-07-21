import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AttendanceErrorCode, postAttend } from "../api/attendance.ts";
import sendIcon from "../assets/send.svg";
import TransferBanner from "../components/admin/TransferBanner.tsx";
import Alert from "../components/Alert.tsx";
import { PrimaryButton } from "../components/Button.tsx";
import NoteSelectModal from "../components/home/NoteSelectModal.tsx";
import TextField from "../components/TextField";
import useModalState from "../hooks/modal.tsx";
import useSubmitHandler from "../hooks/submitHandler.tsx";

const ErrorMessages: Record<AttendanceErrorCode, string> = {
  [AttendanceErrorCode.InvalidAuthCode]: `Could not find a session corresponding to passcode. Please check your credentials or contact the administrator for help.`,
  [AttendanceErrorCode.InvalidName]: `Could not find a session corresponding to your name. Please check your credentials or contact the administrator for help.`,
  [AttendanceErrorCode.AlreadyAttended]: `You have already attended the session.`,
  [AttendanceErrorCode.DifferentName]: `You have already attended the session with a different name.`,
  [AttendanceErrorCode.FailedToAttend]: `Failed to attend the session. Please try again later.`,
};

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

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { mutate: performAttendance } = useMutation({
    mutationFn: postAttend,
    mutationKey: ["attend"],
    onSuccess: (data) => {
      if (data.type == "oneChoice") {
        navigate("/result");
      } else {
        openNoteSelectModal();
      }
    },
    onError: (error) => {
      console.error(error);
      setErrorMessage(ErrorMessages[error.message as AttendanceErrorCode]);
    },
  });

  const [noteSelectModalState, openNoteSelectModal, closeNoteSelectModal] =
    useModalState();

  const submit = () => {
    performAttendance({ attendeeName: name, authCode: passcode });
  };

  const { isSubmitting, handleSubmit } = useSubmitHandler();

  return (
    <>
      <NoteSelectModal
        onCancel={() => closeNoteSelectModal()}
        state={noteSelectModalState}
        onError={(error) => {
          setErrorMessage(ErrorMessages[error.message as AttendanceErrorCode]);
        }}
      />
      <DesktopContainer>
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
              handleSubmit(submit);
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
              maxLength={4}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value.toUpperCase())}
              style={{ marginTop: "1.1rem" }}
            />
            {errorMessage && (
              <Alert type="warning" style={{ marginTop: "2rem" }}>
                {errorMessage}
              </Alert>
            )}
            <PrimaryButton
              type="submit"
              style={{
                marginTop: "4.4rem",
                width: "11.5rem",
                marginLeft: "auto",
              }}
              disabled={name === "" || passcode === "" || isSubmitting}
            >
              <img src={sendIcon} alt="Send" width={20} height={20} />
              Send
            </PrimaryButton>
          </InputContainer>
        </LoginContainer>
      </DesktopContainer>
      <MobileContainer>
        <MobileBannerContainer>
          <MobileBannerLabel>Host</MobileBannerLabel>
          <MobileBannerChatBubble>Are you here?</MobileBannerChatBubble>
        </MobileBannerContainer>
        <MobileInputContainer
          onSubmit={(e) => {
            e.preventDefault();
            performAttendance({ attendeeName: name, authCode: passcode });
          }}
        >
          <TextField
            textFieldStyle={{ padding: "1.5rem" }}
            autoComplete="name"
            placeholder="Name"
            maxLength={4}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            textFieldStyle={{ padding: "1.5rem" }}
            placeholder="Passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value.toUpperCase())}
          />
          {errorMessage && (
            <Alert type="warning" style={{ marginTop: "1rem" }} size="small">
              {errorMessage}
            </Alert>
          )}
          <PrimaryButton
            type="submit"
            style={{
              marginTop: "2rem",
              width: "auto",
              marginLeft: "auto",
              borderRadius: "2rem",
              height: "4.2rem",
            }}
            disabled={name === "" || passcode === ""}
          >
            <img src={sendIcon} alt="Send" width={20} height={20} />
          </PrimaryButton>
        </MobileInputContainer>
      </MobileContainer>
    </>
  );
}

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
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
  align-items: flex-start;
  width: 41rem;
`;

const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
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
  border-radius: 0 2rem 2rem 2rem;
`;

const InputContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 2.9rem;
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  padding: 4.7rem 3rem;
`;

const MobileBannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const MobileBannerLabel = styled.p`
  ${({ theme }) => theme.typography.b3};
  color: #646464;
`;

const MobileBannerChatBubble = styled.div`
  border-radius: 0 2rem 2rem 2rem;
  padding: 1.2rem 2.5rem;

  background-color: ${({ theme }) => theme.colors.lightGrey};

  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary["500"]};
`;

const MobileInputContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

export default Home;
