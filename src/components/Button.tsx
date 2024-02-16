import styled from "styled-components";

const ButtonBase = styled.button`
  padding: 1.2rem 2rem;
  ${({ theme }) => theme.typography.button1};
  border-radius: 0.8rem;
  border: solid 1px transparent;
  cursor: pointer;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  transition:
    background-color 0.2s,
    color 0.2s,
    border 0.2s;

  user-select: none;
`;

const PrimaryButton = styled(ButtonBase)<{ colorScheme?: string }>`
  background-color: ${({ theme, colorScheme }) =>
    theme.colors[colorScheme ?? "primary"]["500"]};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["700"]};
  }

  &:disabled {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["300"]};
  }
`;

const SecondaryButton = styled(ButtonBase)<{ colorScheme?: string }>`
  background-color: ${({ theme, colorScheme }) =>
    theme.colors[colorScheme ?? "primary"]["100"]};
  color: ${({ theme, colorScheme }) =>
    theme.colors[colorScheme ?? "primary"]["500"]};

  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["300"]};
    color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["700"]};
  }

  &:disabled {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["75"]};
    color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["300"]};
  }
`;

const TertiaryButton = styled(ButtonBase)<{ colorScheme?: string }>`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme, colorScheme }) =>
    theme.colors[colorScheme ?? "primary"]["500"]};
  border: 1px solid
    ${({ theme, colorScheme }) => theme.colors[colorScheme ?? "primary"]["500"]};

  &:hover {
    background-color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["50"]};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme, colorScheme }) =>
      theme.colors[colorScheme ?? "primary"]["300"]};
    border: 1px solid
      ${({ theme, colorScheme }) =>
        theme.colors[colorScheme ?? "primary"]["300"]};
  }
`;

const GreyButton = styled(ButtonBase)`
  background-color: #b0b0b0;
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background-color: #727272;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.grey};
  }
`;

export { PrimaryButton, SecondaryButton, TertiaryButton, GreyButton };
