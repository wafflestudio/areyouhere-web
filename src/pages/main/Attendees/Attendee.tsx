import dateFormat from "dateformat";
import React, { useState } from "react";
import styled from "styled-components";

import { AttendanceInfo, useAttendee } from "../../../api/attendee.ts";
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
import TitleBar from "../../../components/TitleBar.tsx";
import { useAttendeeId } from "../../../hooks/urlParse.tsx";

function Attendee() {
  const attendeeId = useAttendeeId();
  const [option, setOption] = useState<string>("latest");

  const { data: attendeeData } = useAttendee(attendeeId);

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
              setIsEditing(false);
              // TODO: updateAttendees(tempAttendees)
            }}
          >
            Save
          </PrimaryButton>
        ) : (
          <TertiaryButton
            onClick={() => {
              setTempAttendances(
                attendeeData?.attendanceInfo?.reduce(
                  (acc, attendance) => ({
                    ...acc,
                    [attendance.attendanceId]: attendance,
                  }),
                  {}
                ) ?? {}
              );
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
            { label: "Name", value: attendeeData?.attendee?.name },
            {
              label: "Note",
              value: attendeeData?.attendee?.note,
            },
            { label: "Attendance", value: attendeeData?.attendee?.attendance },
            { label: "Absence", value: attendeeData?.attendee?.absence },
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
              <TableHeadItem noBorders style={{ width: "24rem" }}>
                Session Name
              </TableHeadItem>
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
                <TableItem noBorders>{attendance.sessionName}</TableItem>
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
`;

const AttendanceChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`;

export default Attendee;
