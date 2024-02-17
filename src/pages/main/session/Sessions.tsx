import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { useSessions } from "../../../api/session.ts";
import AlertModal from "../../../components/AlertModal.tsx";
import SessionItem from "../../../components/sessions/SessionItem.tsx";
import TitleBar from "../../../components/TitleBar.tsx";
import useModalState from "../../../hooks/modal.tsx";

function Sessions() {
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [deleteModalState, openDeleteModal, closeDeleteModal] = useModalState();

  const location = useLocation();
  const classId = parseInt(location.pathname.split("/")[2], 10);
  const { data: sessions } = useSessions(classId);

  return (
    <>
      <Container>
        <TitleBar label="Sessions" />
        <Content>
          <TopBar>
            <TopBarLabel style={{ width: "20rem" }}>Date</TopBarLabel>
            <TopBarLabel style={{ width: "45rem" }}>Session Name</TopBarLabel>
            <TopBarLabel style={{ width: "18rem" }}>Attendance</TopBarLabel>
            <TopBarLabel style={{ width: "18rem" }}>Absence</TopBarLabel>
          </TopBar>
          {sessions != null &&
            sessions.map((session) => (
              <SessionItem
                key={session.id}
                to={`/class/${classId}/sessions/${session.id}`}
                date={session.date}
                sessionName="asd"
                attendance={session.attendee}
                absence={session.absentee}
                onDelete={() => {
                  setDeleteTarget(session.id);
                  openDeleteModal();
                }}
              />
            ))}
        </Content>
      </Container>
      <AlertModal
        state={deleteModalState}
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
          closeDeleteModal();
        }}
        onConfirm={() => {
          // TODO: delete session
          closeDeleteModal();
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
