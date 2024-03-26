import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { useAttendanceStatus } from "../../../api/attendance.ts";
import { deactivateAuthCode } from "../../../api/authCode";
import { useCurrentSessionInfo } from "../../../api/dashboard";
import logo from "../../../assets/dashboard/logo.svg";
import { SecondaryButton } from "../../../components/Button";
import { useClassId } from "../../../hooks/urlParse";

function CodePopup() {
  const [time, setTime] = useState(new Date());

  const classId = useClassId();
  const { data: currentSessionInfo } = useCurrentSessionInfo(classId);

  const { data: attendanceStatus } = useAttendanceStatus(
    classId,
    currentSessionInfo?.id
  );

  const queryClient = useQueryClient();
  const { mutate: deactivate } = useMutation({
    mutationFn: deactivateAuthCode,
    mutationKey: ["deactivateAuthCode"],
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["currentSessionInfo", classId],
      });
      window.close();
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Logo src={logo} alt="Logo" />
      <ContentContainer>
        <TitleLabel>Session Name</TitleLabel>
        <Title>{currentSessionInfo?.sessionName}</Title>
        <PasscodeBubble>
          <Passcode>{currentSessionInfo?.authCode}</Passcode>
          <PresentBubble>
            <PresentLabel style={{ marginTop: "0.6rem", verticalAlign: "top" }}>
              Present
            </PresentLabel>
            <PresentCount>{attendanceStatus?.attendances}</PresentCount>
            <PresentLabel
              style={{ verticalAlign: "bottom" }}
            >{` / Total ${attendanceStatus?.total}`}</PresentLabel>
          </PresentBubble>
        </PasscodeBubble>
        <Time>{dateFormat(time, "HH : MM : ss")}</Time>
        <ButtonContainer>
          <SecondaryButton
            onClick={() => {
              const code = currentSessionInfo?.authCode;
              if (code != null && currentSessionInfo?.id != null) {
                deactivate({
                  authCode: code,
                  courseId: classId,
                  sessionId: currentSessionInfo.id,
                });
              }
              window.close();
            }}
            style={{ borderRadius: "2rem", flex: "1" }}
            colorScheme="red"
          >
            Deactivate
          </SecondaryButton>
        </ButtonContainer>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;

  background: ${({ theme }) => theme.colors.white}
    linear-gradient(
      180deg,
      rgba(241, 242, 255, 0) 0%,
      rgba(241, 242, 255, 1) 100%
    );
`;

const Logo = styled.img`
  position: absolute;
  top: 1.5rem;
  left: 2.7rem;

  width: 16.7rem;
  height: 3.6rem;
`;

const ContentContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100%;
  max-width: 60rem;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleLabel = styled.p`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme }) => theme.colors.primary["500"]};
`;

const Title = styled.h3`
  ${({ theme }) => theme.typography.h2};
  color: ${({ theme }) => theme.colors.black};
`;

const PasscodeBubble = styled.div`
  position: relative;
  padding: 2rem 10rem;
  margin-top: 3.6rem;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 5rem 5rem 0 5rem;
  box-shadow: ${({ theme }) => theme.effects.blur};
`;

const Passcode = styled.p`
  font-size: 12.8rem;
  line-height: 15.4rem;
  font-weight: bold;
  text-align: center;
  text-indent: 0.3em;
  letter-spacing: 0.3em;
  color: ${({ theme }) => theme.colors.primary["500"]};
`;

const PresentBubble = styled.div`
  position: absolute;
  top: -4.5rem;
  right: -7.4rem;
  padding: 2rem 2.5rem;

  border-radius: 3rem 3rem 3rem 0;
  background: linear-gradient(94deg, #92aaff 0%, #3479ff 100%);
  box-shadow: ${({ theme }) => theme.effects.blur};

  display: inline-block;
`;

const PresentLabel = styled.span`
  font-size: 1.3rem;
  line-height: 1.3rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
`;

const PresentCount = styled.span`
  font-size: 4.956rem;
  line-height: 4.956rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};

  padding: 0 0.6rem;
`;

const Time = styled.span`
  font-size: 6.4rem;
  line-height: 7.8rem;
  font-weight: 300;
  text-indent: 0.3em;
  letter-spacing: 0.3em;

  color: ${({ theme }) => theme.colors.black};

  margin-top: 3.6rem;
`;

const ButtonContainer = styled.div`
  width: 30rem;
  height: 5rem;
  display: flex;
  gap: 3rem;
  margin-top: 3rem;
`;

export default CodePopup;
