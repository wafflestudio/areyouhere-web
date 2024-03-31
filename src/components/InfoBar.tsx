import React, { ReactElement } from "react";
import styled from "styled-components";

export interface InfoBarProps extends React.HTMLAttributes<HTMLDivElement> {
  values: { label: string; value?: ReactElement | string | number }[];
}

function InfoBar({ values, ...props }: InfoBarProps) {
  return (
    <Container {...props}>
      <SessionInfoItem style={{ width: "25rem" }}>
        <SessionInfoLabel>{values[0].label}</SessionInfoLabel>
        <SessionInfoContent
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "25rem",
          }}
        >
          {values[0].value}
        </SessionInfoContent>
      </SessionInfoItem>
      <SessionInfoItem style={{ flex: "1" }}>
        <SessionInfoLabel>{values[1].label}</SessionInfoLabel>
        <SessionInfoContent
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "35.7rem",
          }}
        >
          {values[1].value}
        </SessionInfoContent>
      </SessionInfoItem>
      <SessionInfoItem style={{ width: "20rem" }}>
        <SessionInfoLabel>{values[2].label}</SessionInfoLabel>
        <SessionInfoContent>{values[2].value}</SessionInfoContent>
      </SessionInfoItem>
      <SessionInfoItem style={{ width: "20rem" }}>
        <SessionInfoLabel>{values[3].label}</SessionInfoLabel>
        <SessionInfoContent>{values[3].value}</SessionInfoContent>
      </SessionInfoItem>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 2.2rem 2.6rem;
  gap: 4rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 2rem;
`;

const SessionInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
`;

const SessionInfoLabel = styled.span`
  ${({ theme }) => theme.typography.b4};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

const SessionInfoContent = styled.span`
  ${({ theme }) => theme.typography.h5};
  color: ${({ theme }) => theme.colors.black};
`;

export default InfoBar;
