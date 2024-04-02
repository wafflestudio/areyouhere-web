import React from "react";
import styled from "styled-components";

interface TableControlProps extends React.HTMLAttributes<HTMLDivElement> {
  options: { label: string; value: string }[];
  value: string;

  editable?: boolean;
  isEditing?: boolean;

  onOptionChange: (filter: string) => void;

  trailing?: React.ReactNode;
}

function TableControl({
  options,
  value,
  editable = true,
  isEditing = false,
  onOptionChange,
  trailing,
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
      <TrailingContainer>{trailing}</TrailingContainer>
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
  flex: 1;
  flex-direction: row;
  gap: 0.7rem;
`;

const TrailingContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

export default TableControl;
