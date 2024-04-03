import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import React, { useState } from "react";
import styled from "styled-components";

import {
  updateAttendanceStatus,
  UpdateAttendanceStatusRequest,
} from "../../../api/attendance.ts";
import {
  AttendanceInfo,
  updateAttendee,
  UpdateAttendeeRequest,
  useAttendee,
} from "../../../api/attendee.ts";
import Alert from "../../../components/Alert.tsx";
import { PrimaryButton, TertiaryButton } from "../../../components/Button.tsx";
import InfoBar from "../../../components/InfoBar.tsx";
import AttendanceChip from "../../../components/sessions/AttendanceChip.tsx";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
  TableRow,
} from "../../../components/table/Table.tsx";
import TableControl from "../../../components/table/TableControl.tsx";
import { StyledInput } from "../../../components/TextField.tsx";
import TitleBar from "../../../components/TitleBar.tsx";
import { useAttendeeId, useClassId } from "../../../hooks/urlParse.tsx";
import { AttendeeInfo } from "../../../type.ts";

function Attendee() {
  const courseId = useClassId();
  const attendeeId = useAttendeeId();
  const [option, setOption] = useState<string>("latest");

  const queryClient = useQueryClient();
  const { data: attendeeData } = useAttendee(attendeeId);
  const { mutate: updateAttendeeInfo } = useMutation({
    mutationFn: ({
      updatedAttendees,
      updateAttendances,
      courseId,
    }: UpdateAttendeeRequest & UpdateAttendanceStatusRequest) => {
      return Promise.all([
        updateAttendee({
          updatedAttendees,
          courseId,
        }),
        updateAttendanceStatus({
          updateAttendances,
        }),
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendee", attendeeId] });
      setTempAttendee(null);
      setTempAttendances({});
      setIsEditing(false);
      setHasNamesakeError(false);
    },
    onError: (error) => {
      // TODO: How to handle error?
      // what if one request success and the other fails? Can we rollback?
      console.error(error);
      setHasNamesakeError(true);
    },
  });

  const [hasNamesakeError, setHasNamesakeError] = useState(false);

  // 수정 관련
  const [tempAttendee, setTempAttendee] = useState<AttendeeInfo | null>(null);
  const [tempAttendances, setTempAttendances] = useState<
    Record<number, AttendanceInfo>
  >({});
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Container>
      <TitleBar label="Attendee Details">
        {isEditing ? (
          <PrimaryButton
            onClick={() => {
              if (tempAttendee != null) {
                updateAttendeeInfo({
                  updatedAttendees: [tempAttendee],
                  courseId: courseId,
                  updateAttendances: Object.values(tempAttendances),
                });
              }
            }}
          >
            Save
          </PrimaryButton>
        ) : (
          <TertiaryButton
            onClick={() => {
              if (attendeeData != null) {
                setTempAttendances(
                  attendeeData.attendanceInfo.reduce(
                    (acc, attendance) => ({
                      ...acc,
                      [attendance.attendanceId]: attendance,
                    }),
                    {}
                  ) ?? {}
                );
                setTempAttendee(attendeeData.attendee);
                setIsEditing(true);
              }
            }}
          >
            Edit
          </TertiaryButton>
        )}
      </TitleBar>
      <ContentContainer>
        {hasNamesakeError && (
          <Alert type="warning" style={{ marginBottom: "1.2rem" }}>
            There are attendees with the same name and note. Please modify them
            without duplication.
          </Alert>
        )}
        <InfoBar
          values={[
            {
              label: "Name",
              value: isEditing ? (
                <StyledInput
                  style={{ width: "25rem" }}
                  value={tempAttendee!.name}
                  onChange={(e) =>
                    setTempAttendee({
                      ...tempAttendee!,
                      name: e.target.value,
                    })
                  }
                />
              ) : (
                attendeeData?.attendee?.name
              ),
            },
            {
              label: "Note",
              value: isEditing ? (
                <StyledInput
                  style={{ width: "35.7rem" }}
                  value={tempAttendee!.note}
                  onChange={(e) =>
                    setTempAttendee({
                      ...tempAttendee!,
                      note: e.target.value,
                    })
                  }
                />
              ) : (
                attendeeData?.attendee?.note
              ),
            },
            { label: "Attendance", value: attendeeData?.attendance },
            { label: "Absence", value: attendeeData?.absence },
          ]}
        />
        <TableControl
          options={[
            { label: "Earliest", value: "earliest" },
            { label: "Latest", value: "latest" },
          ]}
          editable={false}
          onOptionChange={(filter) => setOption(filter)}
          value={option}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadItem noBorders>Date</TableHeadItem>
              <TableHeadItem noBorders>Session Name</TableHeadItem>
              <TableHeadItem noBorders>Attendance Status</TableHeadItem>
              <TableHeadItem noBorders>Time of Attendance</TableHeadItem>
            </TableRow>
          </TableHead>
          <TableBody>
            {(isEditing
              ? Object.values(tempAttendances)
              : attendeeData?.attendanceInfo ?? []
            ).map((attendance, index) => (
              <TableRow key={index}>
                <TableItem noBorders>
                  {dateFormat(attendance.attendanceTime, "yyyy-mm-dd")}
                </TableItem>
                <TableItem
                  noBorders
                  style={{
                    width: "24rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {attendance.sessionName}
                </TableItem>
                <TableItem noBorders>
                  {isEditing ? (
                    <AttendanceChipContainer>
                      <AttendanceChip
                        type={"attendance"}
                        active={attendance.attendanceStatus}
                        clickable
                        onClick={() => {
                          setTempAttendances({
                            ...tempAttendances,
                            [attendance.attendanceId]: {
                              ...attendance,
                              attendanceStatus: true,
                            },
                          });
                        }}
                      />
                      <AttendanceChip
                        type={"absence"}
                        active={!attendance.attendanceStatus}
                        clickable
                        onClick={() => {
                          setTempAttendances({
                            ...tempAttendances,
                            [attendance.attendanceId]: {
                              ...attendance,
                              attendanceStatus: false,
                            },
                          });
                        }}
                      />
                    </AttendanceChipContainer>
                  ) : (
                    <AttendanceChip
                      type={
                        attendance.attendanceStatus ? "attendance" : "absence"
                      }
                      active
                    />
                  )}
                </TableItem>
                <TableItem noBorders>
                  {dateFormat(attendance.attendanceTime, "HH:MM:ss")}
                </TableItem>
              </TableRow>
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

const AttendanceChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`;

export default Attendee;
