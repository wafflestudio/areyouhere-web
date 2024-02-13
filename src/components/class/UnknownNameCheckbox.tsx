import styled from "styled-components";

import checkBoxAlertBlack from "../../assets/class/tooltipBlack.svg";
import checkBoxAlertGrey from "../../assets/class/tooltipGrey.svg";
import Theme from "../../styles/Theme.tsx";

function UnknownNameCheckbox() {
  return (
    <Container>
      <CheckboxContainer>
        <HiddenCheckbox id="checkbox" type="checkbox" />
        <StyledCheckbox htmlFor="checkbox" />
      </CheckboxContainer>
      <Label htmlFor="checkbox">Only Listed Names Allowed</Label>
      <TooltipIcon>
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
`;

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
  border: 0.1rem solid #e3e3e3;
  border-radius: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    width: 1.2rem;
    height: 1.2rem;
    background: ${Theme.colors.primaryBlue};
    border-radius: 0.2rem;
    opacity: 0;
    transition: opacity 0.1s ease;
  }

  ${HiddenCheckbox}:checked + &::after {
    opacity: 1;
  }
`;

const Label = styled.label`
  font-size: 1.6rem;
  font-weight: 400;
  color: #4f4f4f;
`;

const TooltipIcon = styled.div`
  background-image: url(${checkBoxAlertGrey});
  background-size: cover;
  background-position: center;
  width: 2rem;
  height: 2rem;
  transition: background-image 0.2s ease;

  position: relative;

  &:hover {
    background-image: url(${checkBoxAlertBlack});
  }

  &:hover div {
    visibility: visible;
    opacity: 1;
    transition-delay: 0s;
  }
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
