import styled from "styled-components";

import { PrimaryButton, TertiaryButton } from "../Button";

interface SessionControlProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilterChange: (filter: "all" | "absentees") => void;
  onActionButtonClick: () => void;
  isEditing: boolean;
  filter: "all" | "absentees";
}

function SessionControl({
  onFilterChange,
  onActionButtonClick,
  isEditing,
  filter,
  ...props
}: SessionControlProps) {
  return (
    <Container {...props}>
      <SessionFilterButtonContainer>
        <SessionFilterButton
          active={filter === "all"}
          onClick={() => onFilterChange("all")}
        >
          View All
        </SessionFilterButton>
        <SessionFilterButton
          active={filter === "absentees"}
          onClick={() => onFilterChange("absentees")}
        >
          Absentees Only
        </SessionFilterButton>
      </SessionFilterButtonContainer>
      {isEditing ? (
        <PrimaryButton
          style={{ width: "9.5rem" }}
          onClick={onActionButtonClick}
        >
          Save
        </PrimaryButton>
      ) : (
        <TertiaryButton
          style={{ width: "9.5rem" }}
          onClick={onActionButtonClick}
        >
          Edit
        </TertiaryButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 1.6rem;
  margin-top: 3.2rem;

  user-select: none;
`;

const SessionFilterButton = styled.button<{ active?: boolean }>`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary["500"] : theme.colors.darkGrey};

  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const SessionFilterButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
`;

export default SessionControl;
