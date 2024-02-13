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
    <Container>
      <h2>{label}</h2>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  align-self: flex-start;

  width: calc(100% - 12rem);
  margin: 6rem;

  & h2 {
    font-size: 3.6rem;
    line-height: 4.8rem;
    font-weight: 500;
  }
`;

export default TitleBar;
