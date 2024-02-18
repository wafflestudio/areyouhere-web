import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import {
  useCurrentSessionInfo,
  usePreviousSessions,
} from "../../../api/dashboard.ts";
import { createSession } from "../../../api/session.ts";
import { PrimaryButton } from "../../../components/Button.tsx";
import CreateSessionModal from "../../../components/dashboard/CreateSessionModal.tsx";
import InfoCards from "../../../components/dashboard/InfoCards.tsx";
import {
  SessionTable,
  SessionTableHead,
  SessionTableHeadItem,
  SessionTableBody,
  SessionTableItem,
} from "../../../components/sessions/SessionTable.tsx";
import TitleBar from "../../../components/TitleBar.tsx";
import useModalState from "../../../hooks/modal.tsx";

function Dashboard() {
  const navigate = useNavigate();

  const [
    createSessionModalState,
    openCreateSessionModal,
    closeCreateSessionModal,
  ] = useModalState();

  const location = useLocation();
  const classId = parseInt(location.pathname.split("/")[2], 10);

  const { data: currentSessionInfo } = useCurrentSessionInfo(classId);
  const { data: previousSessions } = usePreviousSessions(classId);

  const queryClient = useQueryClient();
  const { mutate: createSessionMutate } = useMutation({
    mutationFn: createSession,
    mutationKey: ["createSession"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["previousSessions", classId],
      });
      queryClient.invalidateQueries({
        queryKey: ["currentSessionInfo", classId],
      });
    },
  });

  return (
    <>
      <Container>
        <TitleBar label={"Class Dashboard"}>
          <PrimaryButton onClick={() => openCreateSessionModal()}>
            Create New Session
          </PrimaryButton>
        </TitleBar>
        <ContentContainer>
          <Subtitle>Current Session</Subtitle>
          <InfoCards onCreateNewSession={() => openCreateSessionModal()} />
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
              {previousSessions == null || previousSessions.length == 0 ? (
                <tr>
                  <EmptyTableBody colSpan={4} />
                </tr>
              ) : (
                previousSessions.map((session) => (
                  <tr
                    onClick={() => {
                      navigate(`/class/${classId}/sessions/${session.id}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <SessionTableItem style={{ width: "17.5rem" }}>
                      {dateFormat(session.date, "yyyy-mm-dd")}
                    </SessionTableItem>
                    <SessionTableItem>{session.name}</SessionTableItem>
                    <SessionTableItem style={{ width: "17.5rem" }}>
                      {session.attendee}
                    </SessionTableItem>
                    <SessionTableItem style={{ width: "17.5rem" }}>
                      {session.absentee}
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
            createSessionMutate({
              courseId: classId,
              sessionName,
            });
            closeCreateSessionModal();
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
