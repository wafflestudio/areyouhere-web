import { useMutationState } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { AttendanceResult } from "../api/attendance.ts";
import { PrimaryButton, SecondaryButton } from "../components/Button";

function Result() {
  const navigate = useNavigate();
  const attendanceResults = useMutationState<AttendanceResult>({
    filters: { mutationKey: ["attend"] },
    select: (mutation) => mutation.state.data as AttendanceResult,
  });

  if (attendanceResults.length === 0) {
    return <Navigate to={"/"} />;
  } else {
    const result = attendanceResults[attendanceResults.length - 1];
    if (result == null || result.type !== "oneChoice") {
      return <></>;
    }
    const data = result.response;
    return (
      <>
        <DesktopContainer>
          <Title>
            Thank you for the register!
            <br />
            We checked your attendance
          </Title>
          <InfoCard>
            <InfoItem>
              <InfoLabel>Name</InfoLabel>
              <InfoLabel>{data.attendanceName}</InfoLabel>
            </InfoItem>
            <InfoItem style={{ marginTop: "2.6rem" }}>
              <InfoLabel>Class / Session</InfoLabel>
              <InfoLabel>
                {data.courseName} / {data.sessionName}
              </InfoLabel>
            </InfoItem>
            <InfoItem style={{ marginTop: "2.6rem" }}>
              <InfoLabel>Sent Time</InfoLabel>
              <InfoLabel>
                {dateFormat(data.attendanceTime, "HH:MM:ss")}
              </InfoLabel>
            </InfoItem>
            <PrimaryButton
              style={{ marginTop: "4rem" }}
              onClick={() => {
                navigate("/");
              }}
            >
              Back to Main Page
            </PrimaryButton>
          </InfoCard>
        </DesktopContainer>
        <MobileContainer>
          <MobileTitle>
            Your attendance has been successfully registered!
          </MobileTitle>
          <MobileContentContainer>
            <MobileContentLabel>NAME</MobileContentLabel>
            <MobileContent style={{ marginTop: "0.7rem" }}>
              {data.attendanceName}
            </MobileContent>
            <MobileContentLabel style={{ marginTop: "1.8rem" }}>
              CLASS / SESSION
            </MobileContentLabel>
            <MobileContent style={{ marginTop: "0.7rem" }}>
              {data.courseName} / {data.sessionName}
            </MobileContent>
            <MobileContentLabel style={{ marginTop: "1.8rem" }}>
              SENT TIME
            </MobileContentLabel>
            <MobileContent style={{ marginTop: "0.7rem" }}>
              {dateFormat(data.attendanceTime, "HH:MM:ss")}
            </MobileContent>
          </MobileContentContainer>
          <SecondaryButton
            style={{
              marginTop: "2rem",
              borderRadius: "2rem",
              fontWeight: "800",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            CONFIRM
          </SecondaryButton>
        </MobileContainer>
      </>
    );
  }
}

const DesktopContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.lightGrey};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Title = styled.p`
  margin-top: 18.8rem;
  margin-bottom: 4rem;
  ${({ theme }) => theme.typography.h2};
  text-align: center;
`;

const InfoCard = styled.div`
  background-color: white;
  border-radius: 2rem;
  border: 1px solid #e6e6e6;
  width: 44.8rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.2rem 4rem;
`;

const InfoItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const InfoLabel = styled.p`
  font-size: 1.4rem;
  color: #4f4f4f;
  font-weight: 400;
  width: 100%;

  flex: 1;
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }

  padding: 6.6rem 3rem;
  background-color: ${({ theme }) => theme.colors.primary["500"]};
  min-height: 100vh;
`;

const MobileTitle = styled.p`
  ${({ theme }) => theme.typography.h4};
  color: ${({ theme }) => theme.colors.white};
`;

const MobileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;

  border-radius: 3rem;
  background-color: white;

  padding: 3.3rem 3rem;
`;

const MobileContentLabel = styled.p`
  font-size: 1.2rem;
  line-height: 1.8rem;
  color: #a0a0a0;
  font-weight: 800;
`;

const MobileContent = styled.p`
  ${({ theme }) => theme.typography.b1};
  color: ${({ theme }) => theme.colors.black};
`;

export default Result;
