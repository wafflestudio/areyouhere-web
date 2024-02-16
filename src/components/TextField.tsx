import styled from "styled-components";

import Theme from "../styles/Theme.tsx";

const StyledInput = styled.input`
  padding: 1rem 1.5rem;
  ${({ theme }) => theme.typography.b3};
  border: 0.1rem solid #e3e3e3;
  border-radius: 1rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${Theme.colors.lightGrey};
  }
`;

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function TextField({ label, style, ...props }: TextFieldProps) {
  return (
    <TextFieldContainer style={style}>
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      <StyledInput {...props} />
    </TextFieldContainer>
  );
}

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const TextFieldLabel = styled.label`
  font-size: 1.6rem;
  font-weight: 400;
  color: #4f4f4f;
  margin-bottom: 1rem;
`;

export default TextField;
