import React from "react";
import styled from "styled-components";

function TitleBar({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <>
      <Container>
        <h2>{label}</h2>
        {children}
      </Container>
      <Divider />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  align-self: flex-start;

  width: 100%;
  padding: 5.6rem 4.9rem 0 6.3rem;

  & h2 {
    ${({ theme }) => theme.typography.h2};
  }
`;

const Divider = styled.div`
  width: calc(100% - 7rem);
  border-top: ${({ theme }) => theme.colors.grey} 1px solid;
  margin: 2rem 3rem 3rem 2rem;
`;

export default TitleBar;
