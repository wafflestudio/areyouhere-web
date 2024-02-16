import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

import checkGreen from "../../assets/sessions/checkGreen.svg";
import checkGreen100 from "../../assets/sessions/checkGreen100.svg";
import crossRed from "../../assets/sessions/crossRed.svg";
import crossRed100 from "../../assets/sessions/crossRed100.svg";
import minusDarkGrey from "../../assets/sessions/minusDarkGrey.svg";

interface AttendanceChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: "attendance" | "absence" | "none";
  active?: boolean;
}

function AttendanceChip({ type, active, ...props }: AttendanceChipProps) {
  const theme = useContext(ThemeContext);

  active = active ?? false;

  switch (type) {
    case "attendance":
      return (
        <ChipBase
          color={
            active
              ? theme?.colors?.green?.["500"]
              : theme?.colors?.green?.["100"]
          }
          {...props}
        >
          <img src={active ? checkGreen : checkGreen100} alt="Attendance" />
          <span>Attendance</span>
        </ChipBase>
      );
    case "absence":
      return (
        <ChipBase
          color={
            active ? theme?.colors?.red?.["500"] : theme?.colors?.red?.["100"]
          }
          {...props}
        >
          <img src={active ? crossRed : crossRed100} alt="Absence" />
          <span>Absence</span>
        </ChipBase>
      );
    case "none":
      return (
        <ChipBase color={theme?.colors?.darkGrey} {...props}>
          <img src={minusDarkGrey} alt="None" />
        </ChipBase>
      );
  }
}

const ChipBase = styled.button<{ color: string }>`
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.1rem;

  border-radius: 2rem;
  border: 1px solid ${({ color }) => color};
  ${({ theme }) => theme.typography.button1};
  color: ${({ color }) => color};

  background: none;
  cursor: pointer;
  user-select: none;
`;

export default AttendanceChip;
