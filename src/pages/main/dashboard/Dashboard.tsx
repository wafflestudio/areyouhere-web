import { useMutation, useQueryClient } from "@tanstack/react-query";
import dateFormat from "dateformat";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useCourse } from "../../../api/course.ts";
import { usePreviousSessions } from "../../../api/dashboard.ts";
import { createSession } from "../../../api/session.ts";
import { PrimaryButton } from "../../../components/Button.tsx";
import CreateSessionModal from "../../../components/dashboard/CreateSessionModal.tsx";
import InfoCards from "../../../components/dashboard/InfoCards.tsx";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadItem,
  TableItem,
} from "../../../components/table/Table.tsx";
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

  const { data: classItem } = useCourse(classId);

  return (
    <>
      <Container>
        <TitleBar label={classItem?.name ?? ""}>
          <PrimaryButton onClick={() => openCreateSessionModal()}>
            Create New Session
          </PrimaryButton>
        </TitleBar>
        <ContentContainer>
          <Subtitle>Current Session</Subtitle>
          <InfoCards onCreateNewSession={() => openCreateSessionModal()} />
          <Subtitle style={{ marginTop: "5rem" }}>Previous Session</Subtitle>
          <ElevatedSessionTable>
            <TableHead>
              <tr>
                <TableHeadItem style={{ width: "17.5rem" }}>Date</TableHeadItem>
                <TableHeadItem>Session Title</TableHeadItem>
                <TableHeadItem style={{ width: "17.5rem" }}>
                  Attendance
                </TableHeadItem>
                <TableHeadItem style={{ width: "17.5rem" }}>
                  Absence
                </TableHeadItem>
              </tr>
            </TableHead>
            <TableBody>
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
                    <TableItem style={{ width: "17.5rem" }}>
                      {dateFormat(session.date, "yyyy-mm-dd")}
                    </TableItem>
                    <TableItem
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "42.3rem",
                      }}
                    >
                      {session.name}
                    </TableItem>
                    <TableItem style={{ width: "17.5rem" }}>
                      {session.attendee}
                    </TableItem>
                    <TableItem style={{ width: "17.5rem" }}>
                      {session.absentee}
                    </TableItem>
                  </tr>
                ))
              )}
            </TableBody>
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
  margin-bottom: 5rem;
`;

const Subtitle = styled.p`
  ${({ theme }) => theme.typography.h5};
  color: ${({ theme }) => theme.colors.black};
  margin-bottom: 2.4rem;
`;

const ElevatedSessionTable = styled(Table)`
  box-shadow: ${({ theme }) => theme.effects.blur};
`;

const EmptyTableBody = styled.td`
  height: 15rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export default Dashboard;
