import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: #ffffff;
  font-size: 1.8rem;
  line-height: 2.2rem;
  font-weight: bold;
  padding: 1.2rem;
  border-radius: 1.0rem;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const SmallButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: #ffffff;
  font-size: 1.1rem;
  line-height: 1.4rem;
  font-weight: 600;
  padding: 1.1rem;
  border-radius: 1.0rem;
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
