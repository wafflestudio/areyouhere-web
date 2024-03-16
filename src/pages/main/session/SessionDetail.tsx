import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { updateAttendances, UpdateAttendee } from "../../../api/attendance";
import {
  SessionAttendee,
  useSession,
  useSessionAttendees,
} from "../../../api/session";
import AttendanceChip from "../../../components/sessions/AttendanceChip";
import SessionControl from "../../../components/sessions/SessionControl";
import SessionInfoBar from "../../../components/sessions/SessionInfoBar";
import {
  SessionTable,
  SessionTableBody,
  SessionTableHead,
  SessionTableHeadItem,
  SessionTableItem,
} from "../../../components/sessions/SessionTable";
import TitleBar from "../../../components/TitleBar";

function SessionDetail() {
  const [filter, setFilter] = useState<"all" | "absentees">("all");
  const [isEditing, setIsEditing] = useState(false);
  const [tempAttendees, setTempAttendees] = useState<SessionAttendee[]>([]);

  const location = useLocation();
  const sessionId = parseInt(location.pathname.split("/")[4], 10);
  const { data: session } = useSession(sessionId);
  const { data: sessionAttendees } = useSessionAttendees(sessionId);

  const queryClient = useQueryClient();
  const { mutate: updateAttendees } = useMutation({
    mutationFn: updateAttendances,
    mutationKey: ["updateAttendances"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session", sessionId] });
      queryClient.invalidateQueries({
        queryKey: ["sessionAttendees", sessionId],
      });
    },
  });

  return (
    <Container>
      <TitleBar label="Session Details" />
      <ContentContainer>
        <SessionInfoBar
          date={session?.date}
          sessionName={session?.name}
          attendance={session?.attendee}
          absence={session?.absentee}
        />
        <SessionControl
          onActionButtonClick={() => {
            if (!isEditing) {
              // TODO: copy current attendance status
              setTempAttendees(sessionAttendees ?? []);
            } else {
              // TODO: send changed attendance status
              const updateData: UpdateAttendee[] = tempAttendees.map(
                (attendee) => ({
                  attendanceId: attendee.attendanceId,
                  attendanceStatus: attendee.attendanceStatus,
                })
              );
              updateAttendees({
                updateAttendances: updateData,
              });
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
                <tr>
                  <SessionTableItem style={{ width: "24rem" }}>
                    {attendee.attendeeName}
                  </SessionTableItem>
                  <SessionTableItem>
                    <AttendanceChipContainer>
                      {(isEditing || attendee.attendanceStatus) && (
                        <AttendanceChip
                          type="attendance"
                          active={attendee.attendanceStatus}
                          clickable={isEditing}
                          onClick={() => {
                            if (isEditing) {
                              const newTempAttendees = [...tempAttendees];
                              newTempAttendees[index] = {
                                ...newTempAttendees[index],
                                attendanceStatus:
                                  !newTempAttendees[index].attendanceStatus,
                              };
                              setTempAttendees(newTempAttendees);
                            }
                          }}
                        />
                      )}
                      {(isEditing || !attendee.attendanceStatus) && (
                        <AttendanceChip
                          type="absence"
                          active={!attendee.attendanceStatus}
                          clickable={isEditing}
                          onClick={() => {
                            if (isEditing) {
                              const newTempAttendees = [...tempAttendees];
                              newTempAttendees[index] = {
                                ...newTempAttendees[index],
                                attendanceStatus:
                                  !newTempAttendees[index].attendanceStatus,
                              };
                              setTempAttendees(newTempAttendees);
                            }
                          }}
                        />
                      )}
                    </AttendanceChipContainer>
                  </SessionTableItem>
                  <SessionTableItem>
                    {sessionAttendees?.[index]?.attendanceStatus === true
                      ? dateFormat(attendee?.attendanceTime, "HH:mm:ss")
                      : "--:--:--"}
                  </SessionTableItem>
                </tr>
              ))}
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
