import styled from "styled-components";

const StyledInput = styled.input`
  padding: 1.6rem 2.6rem;
  font-size: 1.6rem;
  border: 1px solid #e3e3e3;
  border-radius: 1rem;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #4f4f4f;
  }
`;

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function TextField({ label, style, ...props }: TextFieldProps) {
  return (
    <TextFieldContainer style={style}>
      {
        label && <TextFieldLabel>{label}</TextFieldLabel>
      }
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
  margin-bottom: 1.0rem;
`;

export default TextField;
