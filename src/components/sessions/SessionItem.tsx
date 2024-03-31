import dateFormat from "dateformat";
import React from "react";

import { Session } from "../../api/session.ts";
import Checkbox from "../Checkbox.tsx";
import {
  CheckboxItem,
  SelectableTableRow,
  TableItem,
} from "../table/Table.tsx";
import { StyledInput } from "../TextField.tsx";

interface SessionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  editing: boolean;
  isChecked: boolean;
  onCheckboxChange: () => void;
  to?: string;
  session: Session;
  onSessionChange?: (session: Session) => void;
  onDelete?: () => void;
}

function SessionItem({
  editing,
  isChecked,
  onCheckboxChange,
  to,
  session,
  onSessionChange,
  onDelete,
  ...props
}: SessionItemProps) {
  return (
    <SelectableTableRow selected={isChecked}>
      {editing && (
        <CheckboxItem>
          <Checkbox
            checkboxId={`checkbox-${session.id}`}
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
        {dateFormat(session.date, "yyyy-mm-dd")}
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
            value={session.name}
            onChange={(e) => {
              onSessionChange?.({ ...session, name: e.target.value });
            }}
          />
        ) : (
          <>{session.name}</>
        )}
      </TableItem>
      <TableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
        to={to}
      >
        {session.attendee}
      </TableItem>
      <TableItem
        style={{
          border: "none",
          color: isChecked ? "white" : "black",
        }}
        to={to}
      >
        {session.absentee}
      </TableItem>
    </SelectableTableRow>
  );
}

export default SessionItem;
