import styled from "styled-components";

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 1rem 1.5rem;
  ${({ theme }) => theme.typography.b3};

  border: 1px solid
    ${({ theme, hasError }) => (hasError ? theme.colors.red["500"] : "#e3e3e3")};
  border-radius: 1rem;
  outline: none;

  &:focus {
    border: 1px solid
      ${({ theme, hasError }) =>
        hasError ? theme.colors.red["500"] : theme.colors.primary["400"]};
  }

  &:disabled {
    background-color: #9b9b9b;
    color: ${({ theme }) => theme.colors.grey};
  }

  ::placeholder {
    color: #9b9b9b;
  }
`;

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  textFieldStyle?: React.CSSProperties;
  errorMessage?: string;
}

function TextField({
  label,
  style,
  textFieldStyle,
  errorMessage,
  ...props
}: TextFieldProps) {
  return (
    <TextFieldContainer style={style}>
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      <StyledInput
        {...props}
        style={textFieldStyle}
        hasError={errorMessage != null}
      />
      {errorMessage != null && <ErrorLabel>{errorMessage}</ErrorLabel>}
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
  margin-bottom: 0.4rem;
`;

const ErrorLabel = styled.p`
  ${({ theme }) => theme.typography.b4};
  color: ${({ theme }) => theme.colors.red["500"]};
  margin-top: 0.1rem;
`;

export default TextField;
