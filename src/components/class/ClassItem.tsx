import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import dotsVerticalGrey from "../../assets/class/dotsVerticalGrey.svg";
import trashRed from "../../assets/class/trashRed.svg";
import {
  DropdownContainer,
  DropdownMenu,
  DropdownButton,
  DropdownMenuButton,
} from "../Dropdown.tsx";

interface ClassItemProps {
  id: number;
  name: string;
  description: string;
  attendeeNumber: number;
  color: string;
  onDelete?: () => void;
}

function ClassItem({
  id,
  name,
  description,
  attendeeNumber,
  color,
  onDelete,
}: ClassItemProps) {
  const [isMoreMenuOpened, setIsMoreMenuOpened] = useState(false);

  return (
    <Container style={{ backgroundColor: color }}>
      <ContentLink to={`/class/${id}`}>
        <h4>{name}</h4>
        <p className="description">{description}</p>
        <p className="attendeeNumber">{attendeeNumber} Attendees</p>
      </ContentLink>
      <DropdownContainer
        style={{ position: "absolute", top: "3.5rem", right: "1.6rem" }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            setIsMoreMenuOpened(false);
          }
        }}
      >
        <DropdownMenu isOpened={isMoreMenuOpened}>
          <DropdownDeleteButton
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsMoreMenuOpened(false);
              onDelete?.();
            }}
          >
            <img src={trashRed} alt="Delete" width={20} height={20} />
            Delete
          </DropdownDeleteButton>
        </DropdownMenu>
        <DropdownButton
          type="button"
          onClick={() => {
            setIsMoreMenuOpened(!isMoreMenuOpened);
          }}
        >
          <img src={dotsVerticalGrey} alt="More" width={24} height={24} />
        </DropdownButton>
      </DropdownContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  width: 36rem;
  height: 24rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.grey};
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.effects.dropShadow};
`;

const ContentLink = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 3.5rem 4rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.7rem;

  text-decoration: none;

  h4 {
    width: 100%;
    height: 3.2rem;

    ${({ theme }) => theme.typography.h4};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: ${({ theme }) => theme.colors.black};
  }

  p {
    width: 100%;

    ${({ theme }) => theme.typography.b3};
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
    text-overflow: ellipsis;
    word-wrap: break-word;

    color: ${({ theme }) => theme.colors.darkGrey};
  }

  p.description {
    flex: 1;

    white-space: pre-wrap;
  }
`;

const DropdownDeleteButton = styled(DropdownMenuButton)`
  color: ${({ theme }) => theme.colors.red["500"]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.red["50"]};
  }
`;

export default ClassItem;
