import styled from "styled-components";

const StyledInput = styled.input`
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
  font-size: 16px;
  font-weight: 400;
  color: #4f4f4f;
  margin-bottom: 10px;
`;

export default TextField;
