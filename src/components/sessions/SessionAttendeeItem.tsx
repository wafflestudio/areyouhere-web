import dateFormat from "dateformat";
import React from "react";

import { TableItem } from "../table/Table.tsx";

import AttendanceChipSelection from "./AttendanceChipSelection.tsx";

interface SessionAttendeeItemProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  isEditing: boolean;
  to?: string;
  name: string;
  attendanceStatus: boolean;
  attendanceTime: Date;
  onAttendanceStatusChange?: (status: boolean) => void;
}

function SessionAttendeeItem({
  isEditing,
  to,
  name,
  attendanceStatus,
  attendanceTime,
  onAttendanceStatusChange,
  ...props
}: SessionAttendeeItemProps) {
  return (
    <tr {...props}>
      <TableItem
        style={{
          width: "24rem",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        to={to}
      >
        {name}
      </TableItem>
      <TableItem to={to}>
        <AttendanceChipSelection
          attendance={attendanceStatus}
          onAttendanceChange={onAttendanceStatusChange}
          isEditing={isEditing}
        />
      </TableItem>
      <TableItem to={to}>
        {attendanceStatus ? dateFormat(attendanceTime, "HH:MM:ss") : "--:--:--"}
      </TableItem>
    </tr>
  );
}

export default SessionAttendeeItem;
