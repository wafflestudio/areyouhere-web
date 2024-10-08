import styled, { keyframes } from "styled-components";

import alertTriangleRed from "../assets/alert/alertTriangleRed.svg";
import circleCheckGreen from "../assets/alert/circleCheckGreen.svg";

interface SnackBarProps extends React.HTMLAttributes<HTMLDivElement> {
  isSuccess: boolean;
  message: string;
}

function SnackBar({ isSuccess, message, ...props }: SnackBarProps) {
  return (
    <Container isSuccess={isSuccess} {...props}>
      <img src={isSuccess ? circleCheckGreen : alertTriangleRed} alt="icon" />
      <h2>{message}</h2>
    </Container>
  );
}

const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Container = styled.div<{ isSuccess: boolean }>`
  display: flex;
  flex-direction: row;

  width: 85%;
  height: 5.6rem;

  padding: 1.6rem 2.4rem;
  gap: 1rem;

  border-radius: 0.8rem;

  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);

  background-color: ${({ theme, isSuccess }) =>
    isSuccess ? theme.colors.green[50] : theme.colors.red[50]};

  animation:
    ${fadeIn} 0.2s ease-in,
    ${fadeOut} 0.2s ease-out 2s;

  & h2 {
    ${({ theme }) => theme.typography.b2};
    color: ${({ theme, isSuccess }) =>
      isSuccess ? "#559764" : theme.colors.red[500]};
  }
`;

export default SnackBar;
