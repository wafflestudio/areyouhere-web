import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import React, { useEffect } from "react";
import styled from "styled-components";

import { useAttendanceStatus } from "../../api/attendance";
import { createAuthCode, deactivateAuthCode } from "../../api/authCode";
import { useCurrentSessionInfo } from "../../api/dashboard";
import expandDarkGrey from "../../assets/dashboard/expandDarkGrey.svg";
import { useClassId } from "../../hooks/urlParse";
import { SecondaryButton } from "../Button";

interface InfoCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  onCreateNewSession?: () => void;
  setSessionState?: React.Dispatch<
    React.SetStateAction<"none" | "pending" | "activated">
  >;
}

function InfoCards({
  onCreateNewSession,
  setSessionState,
  ...props
}: InfoCardsProps) {
  const classId = useClassId();

  const queryClient = useQueryClient();

  const { data: currentSessionInfo } = useCurrentSessionInfo(classId);
  const activated = currentSessionInfo?.authCode != null;

  const { mutate: activateSession } = useMutation({
    mutationFn: createAuthCode,
    mutationKey: ["createAuthCode"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentSessionInfo", classId],
      });
    },
  });

  const { mutate: deactivateSession } = useMutation({
    mutationFn: deactivateAuthCode,
    mutationKey: ["deactivateAuthCode"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["currentSessionInfo", classId],
      });
      queryClient.invalidateQueries({
        queryKey: ["previousSessions", classId],
      });
      const channel = new BroadcastChannel("sessionRefresh");
      channel.postMessage("refresh");
      channel.close();
    },
  });

  const { data: attendanceStatus, isError } = useAttendanceStatus(
    classId,
    currentSessionInfo?.id,
    activated
  );

  useEffect(() => {
    if (isError) {
      queryClient.invalidateQueries({
        queryKey: ["currentSessionInfo", classId],
      });
    }
  }, [classId, isError, queryClient]);

  useEffect(() => {
    const channel = new BroadcastChannel("sessionDelete");
    channel.onmessage = () => {
      queryClient.invalidateQueries({
        queryKey: ["currentSessionInfo", classId],
      });
    };
  }, [classId, queryClient]);

  return (
    <InfoCardContainer {...props}>
      {currentSessionInfo?.id != null ? (
        <>
          <InfoCard style={{ width: activated ? "28rem" : "24rem" }}>
            <InfoCardTitle>Passcode</InfoCardTitle>
            {activated ? (
              <>
                <ExpandButton
                  onClick={() => {
                    window.open(
                      `/class/${classId}/sessions/${currentSessionInfo.id}/code`,
                      "_blank"
                    );
                  }}
                >
                  <img
                    src={expandDarkGrey}
                    width={18}
                    height={18}
                    alt="expand"
                  />
                </ExpandButton>
                <Passcode style={{ marginTop: "1.8rem" }}>
                  {currentSessionInfo?.authCode}
                </Passcode>
                <PasscodeButtonContainer style={{ marginTop: "2.3rem" }}>
                  <SecondaryButton
                    style={{ borderRadius: "3rem", width: "100%" }}
                    colorScheme="red"
                    onClick={() => {
                      if (currentSessionInfo?.authCode != null) {
                        deactivateSession({
                          authCode: currentSessionInfo.authCode,
                          sessionId: currentSessionInfo.id,
                          courseId: classId!,
                        });
                        setSessionState?.("none");
                      }
                    }}
                  >
                    Deactivate
                  </SecondaryButton>
                </PasscodeButtonContainer>
              </>
            ) : (
              <ActivateButton
                onClick={() => {
                  if (currentSessionInfo?.id != null) {
                    activateSession({
                      courseId: classId!,
                      sessionId: currentSessionInfo.id,
                    });
                    window.open(
                      `/class/${classId}/sessions/${currentSessionInfo.id}/code`,
                      "_blank"
                    );
                    setSessionState?.("activated");
                  }
                }}
              >
                Activate
              </ActivateButton>
            )}
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>Attendance</InfoCardTitle>
            {activated ? (
              <>
                <AttendanceContainer>
                  <AttendanceCount>
                    {attendanceStatus?.attendances ?? 0}
                  </AttendanceCount>
                  <AttendanceTotal>/</AttendanceTotal>
                  <AttendanceTotal>
                    {attendanceStatus?.total ?? 0}
                  </AttendanceTotal>
                </AttendanceContainer>
                <Absentees>
                  {(attendanceStatus?.total ?? 0) -
                    (attendanceStatus?.attendances ?? 0)}{" "}
                  absentees
                </Absentees>
              </>
            ) : (
              <AttendanceNotActivated>
                No sessions have been activated yet.
              </AttendanceNotActivated>
            )}
          </InfoCard>
          <InfoCard>
            <InfoCardTitle>Details</InfoCardTitle>
            <DetailsBar style={{ marginTop: "2.1rem" }}>
              <DetailsLabel>Name</DetailsLabel>
              <DetailsValue>{currentSessionInfo?.sessionName}</DetailsValue>
            </DetailsBar>
            <DetailsBar style={{ marginTop: "1.6rem" }}>
              <DetailsLabel>Date</DetailsLabel>
              <DetailsValue>
                {dateFormat(
                  currentSessionInfo?.sessionTime,
                  "yyyy-mm-dd (ddd)"
                )}
              </DetailsValue>
            </DetailsBar>
            <DetailsBar style={{ marginTop: "1.6rem" }}>
              <DetailsLabel>Start Time</DetailsLabel>
              <DetailsValue>
                {activated
                  ? dateFormat(currentSessionInfo?.sessionTime, "TT hh:mm")
                  : "-"}
              </DetailsValue>
            </DetailsBar>
          </InfoCard>
        </>
      ) : (
        <InfoCard style={{ width: "100rem", padding: "0" }}>
          <NoSessionCard onClick={onCreateNewSession}>
            <NoSessionTitle>No Sessions have been opened yet.</NoSessionTitle>
            <NoSessionDescription>
              Press 'Create New Session' or click here.
            </NoSessionDescription>
          </NoSessionCard>
        </InfoCard>
      )}
    </InfoCardContainer>
  );
}

const InfoCardContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4.4rem;
`;

const InfoCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 2.2rem 2.5rem;

  width: 24rem;
  height: 23.2rem;
  border-radius: 2rem;

  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: ${({ theme }) => theme.effects.blur};
`;

const InfoCardTitle = styled.p`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme }) => theme.colors.black};
`;

const ActivateButton = styled(SecondaryButton)`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3rem;
  height: 4.2rem;
`;

const ExpandButton = styled.button`
  position: absolute;

  top: 1.5rem;
  right: 1.3rem;

  border: none;
  border-radius: 1rem;
  background: ${({ theme }) => theme.colors.lightGrey} none;

  width: 2.6rem;
  height: 2.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  user-select: none;
`;

const Passcode = styled.span`
  width: 100%;
  text-align: center;

  font-size: 6.4rem;
  line-height: 7.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.black};
`;

const PasscodeButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1.9rem;
`;

const AttendanceContainer = styled.div`
  position: absolute;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  align-items: baseline;
  gap: 1.6rem;
`;

const AttendanceCount = styled.span`
  font-size: 7.2rem;
  line-height: 9.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary["500"]};
`;

const AttendanceTotal = styled.span`
  font-size: 4rem;
  line-height: 4.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

const AttendanceNotActivated = styled.p`
  ${({ theme }) => theme.typography.b1};
  color: ${({ theme }) => theme.colors.darkGrey};
  padding: 0.8rem;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Absentees = styled.p`
  position: absolute;
  bottom: 1.8rem;
  right: 2.3rem;

  ${({ theme }) => theme.typography.b4};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const DetailsBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DetailsLabel = styled.span`
  ${({ theme }) => theme.typography.b4};
  color: ${({ theme }) => theme.colors.black};
`;

const DetailsValue = styled.span`
  ${({ theme }) => theme.typography.b3};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkGrey};

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 15rem;
`;

const NoSessionCard = styled.button`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;

  background: none;
  border: none;
  cursor: pointer;
`;

const NoSessionTitle = styled.p`
  ${({ theme }) => theme.typography.h5};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const NoSessionDescription = styled.p`
  ${({ theme }) => theme.typography.b1};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export default InfoCards;
