import { useState } from "react";
import styled from "styled-components";

import { useDetailedAttendanceStatus } from "../../api/attendance";
import check from "../../assets/dashboard/check.svg";
import cross from "../../assets/dashboard/cross.svg";
import expandDrawer from "../../assets/dashboard/expandDrawer.svg";
import shrinkDrawer from "../../assets/dashboard/shrinkDrawer.svg";

interface AttendanceStatusDrawerProps {
  authCode?: string;
}

const AttendanceStatusDrawer = ({ authCode }: AttendanceStatusDrawerProps) => {
  const [open, setOpen] = useState(false);
  const { data: attendanceDetailedStatus } =
    useDetailedAttendanceStatus(authCode);

  return (
    <>
      <DrawerOpenButton onClick={() => setOpen(!open)}>
        <img src={expandDrawer} alt="Expand Drawer" />
      </DrawerOpenButton>
      <Drawer open={open}>
        <DrawerButton onClick={() => setOpen(false)}>
          <img src={shrinkDrawer} alt="Collapse Drawer" />
        </DrawerButton>
        <AttendedChip style={{ marginTop: "1.9rem" }}>
          <img src={check} alt="Check" />
          ATTENDED
        </AttendedChip>
        <AttendeeContainer style={{ marginTop: "1.4rem" }}>
          {attendanceDetailedStatus?.attendees.map((attendee) => (
            <span
              key={attendee.id}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "10rem",
              }}
            >
              {attendee.name + " " + attendee.note}
            </span>
          ))}
        </AttendeeContainer>
        <AbsentChip style={{ marginTop: "3rem" }}>
          <img src={cross} alt="Cross" />
          NOT ATTENDED
        </AbsentChip>
        <AttendeeContainer style={{ marginTop: "1.4rem" }}>
          {attendanceDetailedStatus?.absentees.map((absentee) => (
            <span
              key={absentee.id}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "10rem",
              }}
            >
              {absentee.name + " " + absentee.note}
            </span>
          ))}
        </AttendeeContainer>
      </Drawer>
    </>
  );
};

const Drawer = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  background-color: ${({ theme }) => theme.colors.darkGrey};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;

  display: flex;
  padding: 1.7rem;
  flex-direction: column;
`;

const DrawerButton = styled.button`
  width: 3.4rem;
  height: 3.4rem;
  padding: 0rem;

  background: none;
  border: none;

  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const DrawerOpenButton = styled(DrawerButton)`
  position: fixed;
  top: 1.7rem;
  right: 1.7rem;
  z-index: 1000;
`;

const StatusChip = styled.div`
  width: fit-content;
  height: 2.6rem;

  padding: 0 1rem;
  border-radius: 1.3rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.1rem;

  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4rem;

  > img {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const AttendedChip = styled(StatusChip)`
  background-color: #00c514;
`;

const AbsentChip = styled(StatusChip)`
  background-color: #c92c2c;
`;

const AttendeeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 1rem;

  font-size: 1.3rem;
  line-height: 1.8rem;
  font-weight: 400;

  color: ${({ theme }) => theme.colors.white};
`;

export default AttendanceStatusDrawer;
