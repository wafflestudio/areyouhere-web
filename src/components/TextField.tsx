import styled from "styled-components";

const TextField = styled.input`
  padding: 16px 26px;
  font-size: 16px;
  border: 1px solid #e3e3e3;
  border-radius: 10px;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #4f4f4f;
  }
`;

export default TextField;
