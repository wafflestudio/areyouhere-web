import { useState } from "react";
import styled from "styled-components";

import AttendanceChip from "../../../components/sessions/AttendanceChip";
import SessionControl from "../../../components/sessions/SessionControl";
import SessionInfoBar from "../../../components/sessions/SessionInfoBar";
import TitleBar from "../../../components/TitleBar";

function SessionDetail() {
  const [filter, setFilter] = useState<"all" | "absentees">("all");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <TitleBar label="Session Details" />
      <Divider />
      <ContentContainer>
        <SessionInfoBar
          date={new Date()}
          sessionName="Waruru Hackerton"
          attendance={5}
          absence={0}
        />
        <SessionControl
          onActionButtonClick={() => {
            if (!isEditing) {
              // TODO: copy current attendance status
            } else {
              // TODO: send changed attendance status
            }
            setIsEditing(!isEditing);
          }}
          onFilterChange={(filter) => setFilter(filter)}
          isEditing={isEditing}
          filter={filter}
        />
        <SessionTable>
          <SessionTableHead>
            <tr>
              <SessionTableHeadItem style={{ width: "24rem" }}>
                Name
              </SessionTableHeadItem>
              <SessionTableHeadItem>Attendance Status</SessionTableHeadItem>
              <SessionTableHeadItem>Time of Attendance</SessionTableHeadItem>
            </tr>
          </SessionTableHead>
          <SessionTableBody>
            <tr>
              <SessionTableItem style={{ width: "24rem" }}>
                홍길동
              </SessionTableItem>
              <SessionTableItem>
                <AttendanceChipContainer>
                  {isEditing && <AttendanceChip type="attendance" />}
                  <AttendanceChip type="absence" active />
                </AttendanceChipContainer>
              </SessionTableItem>
              <SessionTableItem>12:00</SessionTableItem>
            </tr>
          </SessionTableBody>
        </SessionTable>
      </ContentContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: calc(100% - 7rem);
  border-top: ${({ theme }) => theme.colors.grey} 1px solid;
  margin: 2.1rem 2.9rem 3.3rem 4.1rem;
`;

const ContentContainer = styled.div`
  width: 118.1rem;
  display: flex;
  flex-direction: column;
  margin-left: 6.2rem;
  margin-right: auto;
`;

const SessionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: 2rem;
  border-style: hidden;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.grey};
  overflow: hidden;
  table-layout: fixed;
`;

const SessionTableHead = styled.thead`
  background-color: ${({ theme }) => theme.colors.primary["50"]};
`;

const SessionTableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.white};
`;

const SessionTableHeadItem = styled.th`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme }) => theme.colors.black};
  padding: 1.5rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  text-align: left;
  vertical-align: middle;
`;

const SessionTableItem = styled.td`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.colors.black};
  padding: 1.3rem 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  vertical-align: middle;
`;

const AttendanceChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export default SessionDetail;
