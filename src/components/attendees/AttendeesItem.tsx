import styled, { css } from "styled-components";

import { AttendeeInfo } from "../../type.ts";
import Checkbox from "../Checkbox.tsx";
import { SessionTableItem } from "../sessions/SessionTable.tsx";
import { StyledInput } from "../TextField.tsx";

interface AttendeesItemProps {
  editing: boolean;
  attendee: AttendeeInfo;
  attendance: number;
  absence: number;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onAttendeeChange?: (attendee: AttendeeInfo) => void;
  onDelete?: () => void;
}

function AttendeesItem({
  editing,
  attendee,
  attendance,
  absence,
  isChecked,
  onCheckboxChange,
  onAttendeeChange,
}: AttendeesItemProps) {
  return (
    <CustomTr isChecked={isChecked}>
      {editing && (
        <CheckboxCell>
          <Checkbox
            checkboxId={`checkbox-${attendee.id}`}
            checked={isChecked}
            onChange={onCheckboxChange}
          />
        </CheckboxCell>
      )}
      <SessionTableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
      >
        {attendee.name}
      </SessionTableItem>
      <SessionTableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        {editing ? (
          <StyledInput
            value={attendee.note}
            onChange={(e) => {
              if (onAttendeeChange) {
                onAttendeeChange({ ...attendee, note: e.target.value });
              }
            }}
          />
        ) : (
          <>{attendee.note}</>
        )}
      </SessionTableItem>
      <SessionTableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
      >
        {attendance}
      </SessionTableItem>
      <SessionTableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
      >
        {absence}
      </SessionTableItem>
    </CustomTr>
  );
}

interface CustomTrProps {
  isChecked: boolean;
}

const CustomTr = styled.tr<CustomTrProps>`
  border: 1px solid ${({ theme }) => theme.colors.grey};
  background-color: ${({ isChecked, theme }) =>
    isChecked ? theme.colors.primary["400"] : "white"};

  ${({ isChecked }) =>
    !isChecked &&
    css`
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary["50"]};
      }
    `}
`;

const CheckboxCell = styled.td`
  text-align: center;
  vertical-align: middle;
  padding: 1.5rem 2.5rem 1.5rem 3rem;
`;

export default AttendeesItem;
