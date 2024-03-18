import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { deactivateAuthCode } from "../../../api/authCode";
import { useCurrentSessionInfo } from "../../../api/dashboard";
import logo from "../../../assets/dashboard/logo.svg";
import { SecondaryButton } from "../../../components/Button";
import { useClassId } from "../../../hooks/urlParse";

function CodePopup() {
  const [time, setTime] = useState(new Date());

  const classId = useClassId();
  const { data: currentSessionInfo } = useCurrentSessionInfo(classId);

  const queryClient = useQueryClient();
  const { mutate: deactivate } = useMutation({
    mutationFn: deactivateAuthCode,
    mutationKey: ["deactivateAuthCode"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentSessionInfo", classId],
      });
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
        <Title>Passcode</Title>
        <Passcode>{currentSessionInfo?.authCode}</Passcode>
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

  background-color: ${({ theme }) => theme.colors.white};
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

const Title = styled.p`
  font-size: 3.2rem;
  line-height: 3.8rem;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.primary["500"]};
`;

const Passcode = styled.div`
  width: 100%;
  padding: 2rem 5rem;
  margin-top: 3.6rem;

  border: 0.8rem solid ${({ theme }) => theme.colors.primary["500"]};
  border-radius: 3rem;

  font-size: 12.7rem;
  line-height: 15.4rem;
  font-weight: bold;
  text-align: center;
  text-indent: 0.3em;
  letter-spacing: 0.3em;
  color: ${({ theme }) => theme.colors.black};
`;

const Time = styled.p`
  font-size: 6.4rem;
  line-height: 7.8rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};

  margin-top: 1.5rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 5rem;
  display: flex;
  gap: 3rem;
  margin-top: 3.5rem;
`;

export default CodePopup;
