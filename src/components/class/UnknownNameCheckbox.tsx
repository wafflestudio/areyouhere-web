import React from "react";
import styled from "styled-components";

import CheckBoxAlert from "../../assets/class/tooltip.svg?react";
import Theme from "../../styles/Theme.tsx";
import Checkbox from "../Checkbox.tsx";

interface checkboxProps {
  checkboxId: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UnknownNameCheckbox({ checkboxId, checked, onChange }: checkboxProps) {
  return (
    <Container>
      <Checkbox checkboxId={checkboxId} checked={checked} onChange={onChange} />
      <Label htmlFor={checkboxId}>Only Listed Names Allowed</Label>
      <TooltipIcon>
        <TooltipAlert />
        <TooltipText>
          If checked, unlisted attendees won't be added even with the passcode.
          This can be adjusted in settings.
        </TooltipText>
      </TooltipIcon>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  align-self: flex-start;
  margin-left: 19.8rem;
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 400;
  color: #4f4f4f;
`;

const TooltipIcon = styled.div`
  width: 2rem;
  height: 2rem;
  transition: fill 0.2s ease;

  position: relative;

  &:hover div {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
  }
`;

const TooltipAlert = styled(CheckBoxAlert)`
  fill: ${({ theme }) => theme.colors.grey};

  &:hover {
    fill: ${({ theme }) => theme.colors.darkGrey};
  }

  width: 2rem;
  height: 2rem;
  transition: fill 0.2s ease;
`;

const TooltipText = styled.div`
  visibility: hidden;

  width: 28rem;
  height: 8.3rem;

  position: absolute;
  background-color: ${Theme.colors.darkGrey};
  color: #ffffff;

  font-size: 1.4rem;
  line-height: 2.1rem;
  padding: 1rem 1.5rem;

  border-radius: 1rem;

  top: -3rem;
  left: 4rem;

  opacity: 0;
  transition:
    opacity 0.2s ease,
    visibility 0s linear 0.2s;

  /* Arrow */
  &::after {
    content: "";

    position: absolute;

    top: 3rem;
    left: -2rem;

    border-width: 1rem;
    border-style: solid;
    border-color: transparent ${Theme.colors.darkGrey} transparent transparent;
  }
`;

export default UnknownNameCheckbox;
