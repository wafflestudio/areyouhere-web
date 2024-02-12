import styled from "styled-components";

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: #ffffff;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  padding: 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const SmallButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primaryBlue};
  color: #ffffff;
  font-size: 11px;
  line-height: 14px;
  font-weight: 600;
  padding: 11px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export default Button;
export { SmallButton };
