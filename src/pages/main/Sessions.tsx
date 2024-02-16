import { useState } from "react";
import styled from "styled-components";

import AlertModal from "../../components/AlertModal.tsx";
import SessionItem from "../../components/sessions/SessionItem.tsx";
import TitleBar from "../../components/TitleBar.tsx";

function Sessions() {
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);

  return (
    <>
      <Container>
        <TitleBar label="Sessions" />
        <Divider />
        <Content>
          <TopBar>
            <TopBarLabel style={{ width: "20rem" }}>Date</TopBarLabel>
            <TopBarLabel style={{ width: "45rem" }}>Session Name</TopBarLabel>
            <TopBarLabel style={{ width: "18rem" }}>Attendance</TopBarLabel>
            <TopBarLabel style={{ width: "18rem" }}>Absence</TopBarLabel>
          </TopBar>
          {Array.from({ length: 10 }).map((_, index) => (
            <SessionItem
              key={index}
              to="/class/1/sessions/1"
              date={new Date()}
              sessionName="asd"
              attendance={10}
              absence={2}
              onDelete={() => {
                setDeleteTarget(index);
              }}
            />
          ))}
        </Content>
      </Container>
      <AlertModal
        isOpened={deleteTarget !== null}
        type="delete"
        title="Delete Session?"
        content={
          <span>
            Are you sure you want to delete "<b>asd</b>"?
            <br />
            You can't undo this action.
          </span>
        }
        onCancel={() => {
          setDeleteTarget(null);
        }}
        onConfirm={() => {
          // TODO: delete session
          setDeleteTarget(null);
        }}
      />
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;
`;

const Divider = styled.div`
  width: calc(100% - 7rem);
  border-top: ${({ theme }) => theme.colors.grey} 1px solid;
  margin: 2.1rem 2.9rem 3.3rem 4.1rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-left: 6.3rem;
  margin-right: auto;
  gap: 1rem;
`;

const TopBar = styled.div`
  padding: 1rem 3rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary["50"]};

  border: 1px solid ${({ theme }) => theme.colors.grey};
  border-radius: 2rem;
`;

const TopBarLabel = styled.span`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.colors.darkGrey};
`;

export default Sessions;
