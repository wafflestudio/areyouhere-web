import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary["500"]};
  color: #ffffff;
  ${({ theme }) => theme.typography.button1};
  padding: 1.2rem 2rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

const SmallButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary["500"]};
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.4rem;
  font-weight: 600;
  padding: 1.1rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

export default Button;
export { SmallButton };
