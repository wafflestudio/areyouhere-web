import dateFormat from "dateformat";
import styled from "styled-components";

interface SessionInfoBarProps extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  sessionName: string;
  attendance: number;
  absence: number;
}

function SessionInfoBar({
  date,
  sessionName,
  attendance,
  absence,
  ...props
}: SessionInfoBarProps) {
  return (
    <Container {...props}>
      <SessionInfoItem style={{ width: "18rem" }}>
        <SessionInfoLabel>Date</SessionInfoLabel>
        <SessionInfoContent>
          {dateFormat(date, "yyyy-MM-dd")}
        </SessionInfoContent>
      </SessionInfoItem>
      <SessionInfoItem style={{ flex: "1" }}>
        <SessionInfoLabel>Session Name</SessionInfoLabel>
        <SessionInfoContent>{sessionName}</SessionInfoContent>
      </SessionInfoItem>
      <SessionInfoItem style={{ width: "20rem" }}>
        <SessionInfoLabel>Attendance</SessionInfoLabel>
        <SessionInfoContent>{attendance}</SessionInfoContent>
      </SessionInfoItem>
      <SessionInfoItem style={{ width: "20rem" }}>
        <SessionInfoLabel>Absence</SessionInfoLabel>
        <SessionInfoContent>{absence}</SessionInfoContent>
      </SessionInfoItem>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 2.2rem 2.6rem;
  gap: 4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 2rem;
`;

const SessionInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
`;

const SessionInfoLabel = styled.span`
  ${({ theme }) => theme.typography.b4};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const SessionInfoContent = styled.span`
  ${({ theme }) => theme.typography.h5};
  color: ${({ theme }) => theme.colors.black};
`;

export default SessionInfoBar;
