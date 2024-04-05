import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useState } from "react";
import styled from "styled-components";

import {
  updateAttendanceStatus,
  UpdateAttendee,
} from "../../../api/attendance";
import {
  SessionAttendee,
  useSession,
  useSessionAttendees,
} from "../../../api/session";
import { PrimaryButton, TertiaryButton } from "../../../components/Button.tsx";
import InfoBar from "../../../components/InfoBar.tsx";
import SessionAttendeeItem from "../../../components/sessions/SessionAttendeeItem.tsx";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
} from "../../../components/table/Table.tsx";
import TableControl from "../../../components/table/TableControl.tsx";
import TitleBar from "../../../components/TitleBar";
import { useClassId, useSessionId } from "../../../hooks/urlParse.tsx";

function SessionDetail() {
  const [filter, setFilter] = useState<string>("all");
  const [isEditing, setIsEditing] = useState(false);
  const [tempAttendees, setTempAttendees] = useState<SessionAttendee[]>([]);

  const classId = useClassId();
  const sessionId = useSessionId();
  const { data: session } = useSession(sessionId);
  const { data: sessionAttendees } = useSessionAttendees(sessionId);

  const queryClient = useQueryClient();
  const { mutate: updateAttendees } = useMutation({
    mutationFn: updateAttendanceStatus,
    mutationKey: ["updateAttendances"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });

      // 임시로 tempAttendees에 저장된 데이터로 덮어씌워서 fetch가 끝나기 전 이전 데이터가 잠시 보이는 것을 방지
      queryClient.setQueryData(["sessionAttendees", sessionId], tempAttendees);
      queryClient.invalidateQueries({
        queryKey: ["sessionAttendees", sessionId],
      });

      setIsEditing(false);
    },
  });

  return (
    <Container>
      <TitleBar label="Session Details">
        {isEditing ? (
          <PrimaryButton
            onClick={() => {
              const updateData: UpdateAttendee[] = tempAttendees.map(
                (attendee) => ({
                  attendanceId: attendee.attendanceId,
                  attendanceStatus: attendee.attendanceStatus,
                })
              );
              updateAttendees({
                updateAttendances: updateData,
              });
            }}
          >
            Save
          </PrimaryButton>
        ) : (
          <TertiaryButton
            onClick={() => {
              setTempAttendees(sessionAttendees ?? []);
              setIsEditing(true);
            }}
          >
            Edit
          </TertiaryButton>
        )}
      </TitleBar>
      <ContentContainer>
        <InfoBar
          values={[
            { label: "Date", value: dateFormat(session?.date, "yyyy-mm-dd") },
            { label: "Session Name", value: session?.name },
            { label: "Attendance", value: session?.attendee },
            { label: "Absence", value: session?.absentee },
          ]}
        />
        <TableControl
          options={[
            { label: "View All", value: "all" },
            { label: "Absentees Only", value: "absentees" },
          ]}
          onOptionChange={(filter) => setFilter(filter)}
          isEditing={isEditing}
          value={filter}
        />
        <Table>
          <TableHead>
            <tr>
              <TableHeadItem style={{ width: "24rem" }}>Name</TableHeadItem>
              <TableHeadItem>Attendance Status</TableHeadItem>
              <TableHeadItem>Time of Attendance</TableHeadItem>
            </tr>
          </TableHead>
          <TableBody>
            {(isEditing ? tempAttendees : sessionAttendees)
              ?.map((attendee, index) => ({
                attendee,
                index,
              }))
              .filter((entry) => {
                if (filter === "all") {
                  return true;
                } else {
                  return !entry.attendee.attendanceStatus;
                }
              })
              .map(({ attendee, index }) => (
                <SessionAttendeeItem
                  key={index}
                  name={attendee.attendee.name}
                  attendanceStatus={attendee.attendanceStatus}
                  attendanceTime={attendee.attendanceTime}
                  isEditing={isEditing}
                  onAttendanceStatusChange={(status) => {
                    const newTempAttendees = [...tempAttendees];
                    newTempAttendees[index] = {
                      ...attendee,
                      attendanceStatus: status,
                    };
                    setTempAttendees(newTempAttendees);
                  }}
                  to={
                    isEditing
                      ? undefined
                      : `/class/${classId}/attendee/${attendee.attendee.id}`
                  }
                />
              ))}
          </TableBody>
        </Table>
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
  margin-bottom: 5rem;
`;

export default SessionDetail;
