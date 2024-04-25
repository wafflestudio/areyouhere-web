import React from "react";
import styled from "styled-components";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode;
  textFieldStyle?: React.CSSProperties;
  hasError?: boolean;
  supportingText?: React.ReactNode | string;
}

interface SingleLineTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  supportingText?: string;
  textFieldStyle?: React.CSSProperties;
}

interface MultiLineTextFieldProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  textFieldStyle?: React.CSSProperties;
}

// TextField에 사용됨
export const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 1rem 1.5rem;
  ${({ theme }) => theme.typography.b3};

  border: 0.1rem solid
    ${({ theme, hasError }) => (hasError ? theme.colors.red["500"] : "#e3e3e3")};
  border-radius: 1rem;
  outline: none;

  &:focus {
    border: 0.1rem solid
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

  &:read-only {
    background-color: ${({ theme }) => theme.colors.lightGrey};
    border: none;
    color: ${({ theme }) => theme.colors.darkGrey};
  }
`;

// MultiLineTextField에 사용됨
const MultiLineTextarea = styled.textarea`
  padding: 1rem 1.5rem;
  ${({ theme }) => theme.typography.b3};

  border: 0.1rem solid #e3e3e3;
  border-radius: 1rem;
  outline: none;

  width: 45rem;

  resize: none;

  &:focus {
    border: 0.1rem solid ${({ theme }) => theme.colors.primary["400"]};
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
      {typeof label === "string"
        ? label && <TextFieldLabel>{label}</TextFieldLabel>
        : label}
      <StyledInput {...props} style={textFieldStyle} hasError={hasError} />
      {supportingText != null && (
        <SupportingLabel hasError={hasError}>{supportingText}</SupportingLabel>
      )}
    </InputContainer>
  );
}

// create class, setting, account setting에서만 쓰임
function SingleLineTextField({
  label,
  style,
  textFieldStyle,
  hasError,
  supportingText,
  ...props
}: SingleLineTextFieldProps) {
  return (
    <TextAreaContainer style={style}>
      {label && (
        <TextFieldLabel style={{ marginTop: "0.9rem" }}>{label}</TextFieldLabel>
      )}
      <div>
        <TextField
          {...props}
          style={{
            width: "45rem",
            ...textFieldStyle,
          }}
          hasError={hasError}
        />
        {supportingText != null && (
          <SupportingLabel hasError={hasError}>
            {supportingText}
          </SupportingLabel>
        )}
      </div>
    </TextAreaContainer>
  );
}

function MultiLineTextField({
  label,
  style,
  textFieldStyle,
  ...props
}: MultiLineTextFieldProps) {
  return (
    <TextAreaContainer style={style}>
      {label && <TextFieldLabel>{label}</TextFieldLabel>}
      <MultiLineTextarea {...props} style={textFieldStyle} />
    </TextAreaContainer>
  );
}

const TextFieldLabel = styled.label`
  ${({ theme }) => theme.typography.b3};
  font-weight: 600;
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
    width: 45rem;

    display: flex;
    flex-direction: column;
  }
`;

export default TextField;
export { SingleLineTextField, MultiLineTextField };
