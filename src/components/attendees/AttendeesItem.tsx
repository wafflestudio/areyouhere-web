import styled, { css } from "styled-components";

import { AttendeeInfo } from "../../type.ts";
import Checkbox from "../Checkbox.tsx";
import { CheckboxItem, TableItem } from "../table/Table.tsx";
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
  to?: string;
}

function AttendeesItem({
  editing,
  attendee,
  attendance,
  absence,
  isChecked,
  onCheckboxChange,
  onAttendeeChange,
  to,
}: AttendeesItemProps) {
  return (
    <CustomTr isChecked={isChecked}>
      {editing && (
        <CheckboxItem>
          <Checkbox
            checkboxId={`checkbox-${attendee.id}`}
            checked={isChecked}
            onChange={onCheckboxChange}
          />
        </CheckboxItem>
      )}
      <TableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
        to={to}
      >
        {attendee.name}
      </TableItem>
      <TableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
          paddingTop: 0,
          paddingBottom: 0,
        }}
        to={to}
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
      </TableItem>
      <TableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
        to={to}
      >
        {attendance}
      </TableItem>
      <TableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
        to={to}
      >
        {absence}
      </TableItem>
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

export default AttendeesItem;
