import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import trashRed from "../../assets/class/trashRed.svg";
import {
  DropdownButton,
  DropdownContainer,
  DropdownMenu,
  DropdownMenuButton,
} from "../Dropdown";

interface SessionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  to: string;
  date: Date;
  sessionName: string;
  attendance: number;
  absence: number;
  onDelete?: () => void;
}

function SessionItem({
  to,
  date,
  sessionName,
  attendance: attendees,
  absence: absentees,
  onDelete,
  ...props
}: SessionItemProps) {
  const [isMoreMenuOpened, setIsMoreMenuOpened] = useState(false);

  return (
    <SessionCard {...props}>
      <SessionCardLink to={to}>
        <SessionCardLabel style={{ width: "20rem" }}>
          {date.toISOString().split("T")[0]}
        </SessionCardLabel>
        <SessionCardLabel style={{ width: "45rem" }}>
          {sessionName}
        </SessionCardLabel>
        <SessionCardLabel style={{ width: "18rem" }}>
          {attendees}
        </SessionCardLabel>
        <SessionCardLabel style={{ width: "18rem" }}>
          {absentees}
        </SessionCardLabel>
      </SessionCardLink>
      <DropdownContainer
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            console.log("2");
            setIsMoreMenuOpened(false);
          }
        }}
      >
        <DropdownMenu isOpened={isMoreMenuOpened}>
          <DropdownDeleteButton
            type="button"
            onClick={() => {
              setIsMoreMenuOpened(false);
              if (onDelete) onDelete();
            }}
          >
            <img src={trashRed} alt="Delete" width={20} height={20} />
            Delete
          </DropdownDeleteButton>
        </DropdownMenu>
        <DropdownButton
          type="button"
          onClick={() => {
            setIsMoreMenuOpened(true);
          }}
        />
      </DropdownContainer>
    </SessionCard>
  );
}

const SessionCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 2rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 1.8rem;
`;

const SessionCardLink = styled(Link)`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  text-decoration: none;
`;

const SessionCardLabel = styled.span`
  ${({ theme }) => theme.typography.b1};
  color: ${({ theme }) => theme.colors.black};
`;

const DropdownDeleteButton = styled(DropdownMenuButton)`
  color: ${({ theme }) => theme.colors.red["500"]};
  &:hover {
    background-color: ${({ theme }) => theme.colors.red["50"]};
  }
`;

export default SessionItem;
