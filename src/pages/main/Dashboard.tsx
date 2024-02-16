import { useState } from "react";
import styled from "styled-components";

import { PrimaryButton } from "../../components/Button.tsx";
import CreateSessionModal from "../../components/dashboard/CreateSessionModal.tsx";
import InfoCards from "../../components/dashboard/InfoCards.tsx";
import {
  SessionTable,
  SessionTableHead,
  SessionTableHeadItem,
  SessionTableBody,
  SessionTableItem,
} from "../../components/sessions/SessionTable.tsx";
import TitleBar from "../../components/TitleBar.tsx";
import useModalState from "../../hooks/modal.tsx";

interface SessionData {
  date: string;
  title: string;
  attendance: number;
  absence: number;
}

function Dashboard() {
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [
    createSessionModalState,
    openCreateSessionModal,
    closeCreateSessionModal,
  ] = useModalState();

  const addSession = () => {
    setSessions([
      ...sessions,
      {
        date: "2021-07-01",
        title: "Waruru Hackerton",
        attendance: 5,
        absence: 0,
      },
    ]);
  };

  return (
    <>
      <Container>
        <TitleBar label="Class Name">
          <PrimaryButton onClick={() => openCreateSessionModal()}>
            Create New Session
          </PrimaryButton>
        </TitleBar>
        <Divider />
        <ContentContainer>
          <Subtitle>Current Session</Subtitle>
          <InfoCards
            hasSession={sessions.length > 0}
            onCreateNewSession={() => openCreateSessionModal()}
          />
          <Subtitle style={{ marginTop: "5rem" }}>Previous Session</Subtitle>
          <ElevatedSessionTable>
            <SessionTableHead>
              <tr>
                <SessionTableHeadItem style={{ width: "17.5rem" }}>
                  Date
                </SessionTableHeadItem>
                <SessionTableHeadItem>Session Title</SessionTableHeadItem>
                <SessionTableHeadItem style={{ width: "17.5rem" }}>
                  Attendance
                </SessionTableHeadItem>
                <SessionTableHeadItem style={{ width: "17.5rem" }}>
                  Absence
                </SessionTableHeadItem>
              </tr>
            </SessionTableHead>
            <SessionTableBody>
              {sessions.length == 0 ? (
                <tr>
                  <EmptyTableBody colSpan={4} />
                </tr>
              ) : (
                sessions.map((session) => (
                  <tr>
                    <SessionTableItem style={{ width: "17.5rem" }}>
                      {session.date}
                    </SessionTableItem>
                    <SessionTableItem>{session.title}</SessionTableItem>
                    <SessionTableItem style={{ width: "17.5rem" }}>
                      {session.attendance}
                    </SessionTableItem>
                    <SessionTableItem style={{ width: "17.5rem" }}>
                      {session.absence}
                    </SessionTableItem>
                  </tr>
                ))
              )}
            </SessionTableBody>
          </ElevatedSessionTable>
        </ContentContainer>
      </Container>
      {createSessionModalState != "closed" && (
        <CreateSessionModal
          state={createSessionModalState}
          onClose={closeCreateSessionModal}
          onSubmit={(sessionName) => {
            // TODO: create a new session
            addSession();
          }}
        />
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Divider = styled.div`
  width: calc(100% - 7rem);
  border-top: ${({ theme }) => theme.colors.grey} 1px solid;
  margin: 2.1rem 2.9rem 5.4rem 4.1rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100rem;
  margin-left: 6.3rem;
  margin-right: auto;
  margin-bottom: 13.2rem;
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.typography.h5};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2.4rem;
`;

const ElevatedSessionTable = styled(SessionTable)`
  box-shadow: ${({ theme }) => theme.effects.blur};
`;

const EmptyTableBody = styled.td`
  height: 15rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default Dashboard;
