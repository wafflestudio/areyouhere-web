import React from "react";
import styled from "styled-components";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  textareaStyle?: React.CSSProperties;
}

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
  hasError?: boolean;
  supportingText?: React.ReactNode | string;
}

const StyledTextArea = styled.textarea`
  padding: 1rem 1.5rem;
  ${({ theme }) => theme.typography.b3};
  border: 0.1rem solid #e3e3e3;
  border-radius: 1rem;

  width: 45rem;

  resize: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #9b9b9b;
  }
`;

function TextField({
  label,
  style,
  textFieldStyle,
  hasError,
  supportingText,
  ...props
}: TextFieldProps) {
  return (
    <InputContainer style={style}>
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      <StyledInput {...props} style={textFieldStyle} hasError={hasError} />
      {supportingText != null && (
        <SupportingLabel hasError={hasError}>{supportingText}</SupportingLabel>
      )}
    </InputContainer>
  );
}

function MultiLineTextField({
  label,
  style,
  textareaStyle,
  ...props
}: TextAreaProps) {
  return (
    <TextAreaContainer style={style}>
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      <StyledTextArea {...props} style={textareaStyle} />
    </TextAreaContainer>
  );
}

const TextFieldLabel = styled.label`
  ${({ theme }) => theme.typography.b3};
  font-weight: 600;
  margin-bottom: 0.4rem;
`;

const SupportingLabel = styled.p<{ hasError?: boolean }>`
  ${({ theme }) => theme.typography.b4};
  color: ${({ theme, hasError }) =>
    hasError ? theme.colors.red["500"] : theme.colors.black};
  margin-top: 0.1rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.8rem;

  div {
    width: 18rem;
    text-align: right;
    padding-top: 1rem;
  }
`;

export default TextField;
export { MultiLineTextField };
