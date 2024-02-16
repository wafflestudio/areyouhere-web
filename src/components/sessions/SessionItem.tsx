import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import dotsVerticalGrey from "../../assets/class/dotsVerticalGrey.svg";
import trashRed from "../../assets/class/trashRed.svg";

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
      <SessionDropdownContainer
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            console.log("2");
            setIsMoreMenuOpened(false);
          }
        }}
      >
        <SessionMoreButton
          type="button"
          onClick={() => {
            setIsMoreMenuOpened(true);
          }}
        />
        <SessionMoreMenu isOpened={isMoreMenuOpened}>
          <SessionMenuButton
            type="button"
            onClick={() => {
              setIsMoreMenuOpened(false);
              if (onDelete) onDelete();
            }}
          >
            <img src={trashRed} alt="Delete" width={20} height={20} />
            Delete
          </SessionMenuButton>
        </SessionMoreMenu>
      </SessionDropdownContainer>
    </SessionCard>
  );
}

const SessionCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.white};

  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 2rem;
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

const SessionDropdownContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1.8rem;
  z-index: 1;
`;

const SessionMoreButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  background: none;
  border: none;
  background-image: url(${dotsVerticalGrey});

  cursor: pointer;
`;

const SessionMoreMenu = styled.div<{ isOpened: boolean }>`
  position: absolute;
  top: 2.4rem;
  right: 1.2rem;

  display: ${({ isOpened: isOpened }) => (isOpened ? "flex" : "none")};
  flex-direction: column;
  box-shadow: ${({ theme }) => theme.effects.blur};

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
`;

const SessionMenuButton = styled.button`
  display: flex;
  flex-direction: row;
  padding: 1.1rem 2.1rem;
  gap: 3rem;

  color: ${({ theme }) => theme.colors.red["500"]};
  ${({ theme }) => theme.typography.button1};
  border: none;
  border-radius: 0.8rem;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.red["50"]};
  }

  transition: background-color 0.2s;
`;

export default SessionItem;
