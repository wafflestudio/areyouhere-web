import { useState } from "react";
import styled from "styled-components";

import AttendanceChip from "../../../components/sessions/AttendanceChip";
import SessionControl from "../../../components/sessions/SessionControl";
import SessionInfoBar from "../../../components/sessions/SessionInfoBar";
import {
  SessionTable,
  SessionTableHead,
  SessionTableHeadItem,
  SessionTableBody,
  SessionTableItem,
} from "../../../components/sessions/SessionTable";
import TitleBar from "../../../components/TitleBar";

function SessionDetail() {
  const [filter, setFilter] = useState<"all" | "absentees">("all");
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <TitleBar label="Session Details" />
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
                  {isEditing && (
                    <AttendanceChip type="attendance" clickable={isEditing} />
                  )}
                  <AttendanceChip type="absence" active clickable={isEditing} />
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

const ContentContainer = styled.div`
  width: 118.1rem;
  display: flex;
  flex-direction: column;
  margin-left: 6.2rem;
  margin-right: auto;
`;

const AttendanceChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export default SessionDetail;
