import styled from "styled-components";

import { Attendee } from "../../type.ts";
import Checkbox from "../Checkbox.tsx";
import { SessionTableItem } from "../sessions/SessionTable.tsx";

interface AttendeesItemProps {
  attendee: Attendee;
  isChecked: boolean;
  onCheckboxChange: () => void;
  onDelete?: () => void;
}

function AttendeesItem({
  attendee,
  isChecked,
  onCheckboxChange,
}: AttendeesItemProps) {
  return (
    <CustomTr isChecked={isChecked}>
      <CheckboxCell>
        <Checkbox
          checkboxId={`checkbox-${attendee.id}`}
          checked={isChecked}
          onChange={onCheckboxChange}
        />
      </CheckboxCell>
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
        }}
      >
        {attendee.attendance}
      </SessionTableItem>
      <SessionTableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
      >
        {attendee.absence}
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
    isChecked ? theme.colors.primary["400"] : "transparent"};
`;

const CheckboxCell = styled.td`
  width: 4rem;
  vertical-align: middle;
  padding: 1.5rem 2.5rem 1.5rem 3rem;
`;

export default AttendeesItem;
