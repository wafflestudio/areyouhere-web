import dateFormat from "dateformat";
import { useState } from "react";
import styled from "styled-components";

import { useAttendee } from "../../../api/attendee.ts";
import { PrimaryButton } from "../../../components/Button.tsx";
import InfoBar from "../../../components/InfoBar.tsx";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
} from "../../../components/table/Table.tsx";
import TableControl from "../../../components/table/TableControl.tsx";
import TitleBar from "../../../components/TitleBar.tsx";
import { useAttendeeId } from "../../../hooks/urlParse.tsx";

function Attendee() {
  const attendeeId = useAttendeeId();
  const [filter, setFilter] = useState<string>("latest");
  const [isEditing, setIsEditing] = useState(false);

  const { data: attendeeData } = useAttendee(attendeeId);

  return (
    <Container>
      <TitleBar label="Session Details">
        <PrimaryButton
          style={{ width: "9.5rem" }}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </PrimaryButton>
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
          onOptionChange={(filter) => setFilter(filter)}
          value={filter}
        />
        <Table>
          <TableHead>
            <tr>
              <TableHeadItem>Date</TableHeadItem>
              <TableHeadItem style={{ width: "24rem" }}>
                Session Name
              </TableHeadItem>
              <TableHeadItem>Attendance Status</TableHeadItem>
              <TableHeadItem>Time of Attendance</TableHeadItem>
            </tr>
          </TableHead>
          <TableBody>
            {attendeeData?.attendanceInfo.map((attendance, index) => (
              <tr key={index}>
                <TableItem>
                  {dateFormat(attendance.attendanceTime, "yyyy-mm-dd")}
                </TableItem>
                <TableItem>{attendance.sessionName}</TableItem>
                <TableItem>{attendance.attendanceStatus}</TableItem>
                <TableItem>
                  {dateFormat(attendance.attendanceTime, "HH:MM")}
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

export default Attendee;
