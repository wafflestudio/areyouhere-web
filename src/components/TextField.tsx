import styled from "styled-components";

const StyledInput = styled.input`
  padding: 1rem 1.5rem;
  ${({ theme }) => theme.typography.b3};
  border: 0.1rem solid #e3e3e3;
  border-radius: 1rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #9b9b9b;
  }
`;

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  textFieldStyle?: React.CSSProperties;
}

function TextField({ label, style, textFieldStyle, ...props }: TextFieldProps) {
  return (
    <TextFieldContainer style={style}>
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      <StyledInput {...props} style={textFieldStyle} />
    </TextFieldContainer>
  );
}

const TextFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const TextFieldLabel = styled.label`
  ${({ theme }) => theme.typography.b3};
  font-weight: 600;
  margin-bottom: 1rem;
`;

export default TextField;
