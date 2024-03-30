import React from "react";
import styled from "styled-components";

import { PrimaryButton, TertiaryButton } from "../Button.tsx";

interface TableControlProps extends React.HTMLAttributes<HTMLDivElement> {
  options: { label: string; value: string }[];
  value: string;

  editable?: boolean;
  isEditing?: boolean;

  onOptionChange: (filter: string) => void;
  onActionButtonClick?: () => void;
}

function TableControl({
  options,
  value,
  editable = true,
  isEditing = false,
  onOptionChange,
  onActionButtonClick,
  ...props
}: TableControlProps) {
  return (
    <Container {...props}>
      <OptionButtonContainer>
        {options.map((filter, index) => (
          <OptionButton
            key={index}
            active={value === filter.value}
            onClick={() => onOptionChange(filter.value)}
          >
            {filter.label}
          </OptionButton>
        ))}
      </OptionButtonContainer>
      {editable &&
        (isEditing ? (
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
        ))}
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

const OptionButton = styled.button<{ active?: boolean }>`
  ${({ theme }) => theme.typography.b2};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary["500"] : theme.colors.darkGrey};

  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

const OptionButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
`;

export default TableControl;
