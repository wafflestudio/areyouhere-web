import React from "react";
import styled from "styled-components";

import Theme from "../styles/Theme.tsx";

interface checkboxProps {
  checkboxId: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Checkbox({ checkboxId, checked, onChange }: checkboxProps) {
  return (
    <CheckboxContainer>
      <HiddenCheckbox
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
      />
      <StyledCheckbox htmlFor={checkboxId} />
    </CheckboxContainer>
  );
}

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
  margin: 0;
`;

const StyledCheckbox = styled.label`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;

  width: 2rem;
  height: 2rem;
  background-color: #ffffff;
  border: 0.1rem solid #e3e3e3;
  border-radius: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    background: ${Theme.colors.primary["500"]};
    border-radius: 0.2rem;
    opacity: 0;
    transition: opacity 0.1s ease;
  }

  ${HiddenCheckbox}:checked + &::after {
    opacity: 1;
  }
`;

export default Checkbox;
