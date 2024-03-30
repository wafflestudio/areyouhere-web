import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useState } from "react";
import { useLocation } from "react-router-dom";
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
import AttendanceChip from "../../../components/sessions/AttendanceChip";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
} from "../../../components/table/Table.tsx";
import TableControl from "../../../components/table/TableControl.tsx";
import TitleBar from "../../../components/TitleBar";

function SessionDetail() {
  const [filter, setFilter] = useState<string>("all");
  const [isEditing, setIsEditing] = useState(false);
  const [tempAttendees, setTempAttendees] = useState<SessionAttendee[]>([]);

  const location = useLocation();
  const sessionId = parseInt(location.pathname.split("/")[4], 10);
  const { data: session } = useSession(sessionId);
  const { data: sessionAttendees } = useSessionAttendees(sessionId);

  const queryClient = useQueryClient();
  const { mutate: updateAttendees } = useMutation({
    mutationFn: updateAttendanceStatus,
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
              setIsEditing(false);
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
                <tr>
                  <TableItem style={{ width: "24rem" }}>
                    {attendee.attendee.name}
                  </TableItem>
                  <TableItem>
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
                  </TableItem>
                  <TableItem>
                    {sessionAttendees?.[index]?.attendanceStatus === true
                      ? dateFormat(attendee?.attendanceTime, "HH:MM:ss")
                      : "--:--:--"}
                  </TableItem>
                </tr>
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
`;

const AttendanceChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export default SessionDetail;
