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
`;

export default Button;
