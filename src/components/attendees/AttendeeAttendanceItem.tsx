import dateFormat from "dateformat";

import { AttendanceInfo } from "../../api/attendee";
import AttendanceChipSelection from "../sessions/AttendanceChipSelection";
import { TableRow, TableItem } from "../table/Table";

interface AttendeeAttendanceItemProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  attendance: AttendanceInfo;
  onAttendanceStatusChange?: (status: boolean) => void;
  isEditing: boolean;
  to?: string;
}

const AttendeeAttendanceItem = ({
  attendance,
  isEditing,
  onAttendanceStatusChange,
  to,
  ...props
}: AttendeeAttendanceItemProps) => {
  return (
    <TableRow {...props}>
      <TableItem noBorders to={to}>
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
        to={to}
      >
        {attendance.sessionName}
      </TableItem>
      <TableItem noBorders to={to}>
        <AttendanceChipSelection
          attendance={attendance.attendanceStatus}
          onAttendanceChange={onAttendanceStatusChange}
          isEditing={isEditing}
        />
      </TableItem>
      <TableItem noBorders to={to}>
        {dateFormat(attendance.attendanceTime, "HH:MM:ss")}
      </TableItem>
    </TableRow>
  );
};

export default AttendeeAttendanceItem;
