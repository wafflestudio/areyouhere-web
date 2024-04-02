import styled from "styled-components";

import alertTriangleRed from "../assets/alert/alertTriangleRed.svg";
import circleXRed from "../assets/alert/circleXRed.svg";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "error" | "warning";
  size?: "normal" | "small";
}

function Alert({ type, children, size, ...props }: AlertProps) {
  size = size || "normal";
  return (
    <AlertContainer {...props}>
      {type === "error" ? (
        <img width={24} height={24} src={circleXRed} alt="Error" />
      ) : (
        <img width={24} height={24} src={alertTriangleRed} alt="Warning" />
      )}
      <AlertText size={size}>{children}</AlertText>
    </AlertContainer>
  );
}

const AlertContainer = styled.div`
  width: 100%;
  padding: 1.6rem;
  display: flex;
  flex-direction: row;
  align-items: top;

  background-color: ${({ theme }) => theme.colors.red["50"]};
`;

const AlertText = styled.p<{ size: "normal" | "small" }>`
  margin-left: 1.3rem;
  ${({ theme, size }) =>
    size === "normal" ? theme.typography.b1 : theme.typography.b4};
  color: ${({ theme }) => theme.colors.red["500"]};
  line-height: 2.4rem;
`;

export default Alert;
