import styled from "styled-components";

import AttendanceChip from "./AttendanceChip";

export interface AttendanceChipSelectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isEditing?: boolean;
  attendance: boolean;
  onAttendanceChange?: (attendance: boolean) => void;
}

const AttendanceChipSelection = ({
  isEditing,
  attendance,
  onAttendanceChange,
  ...props
}: AttendanceChipSelectionProps) => {
  return (
    <AttendanceChipContainer {...props}>
      {(isEditing || attendance) && (
        <AttendanceChip
          type={"attendance"}
          active={attendance}
          clickable
          onClick={() => {
            onAttendanceChange?.(true);
          }}
        />
      )}
      {(isEditing || !attendance) && (
        <AttendanceChip
          type={"absence"}
          active={!attendance}
          clickable
          onClick={() => {
            onAttendanceChange?.(false);
          }}
        />
      )}
    </AttendanceChipContainer>
  );
};

const AttendanceChipContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
`;

export default AttendanceChipSelection;
