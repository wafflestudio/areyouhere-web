import styled from "styled-components";

import { PrimaryButton, SecondaryButton } from "../../components/Button.tsx";
import InfoCards from "../../components/dashboard/InfoCards.tsx";
import AttendanceChip from "../../components/sessions/AttendanceChip.tsx";
import {
  SessionTable,
  SessionTableHead,
  SessionTableHeadItem,
  SessionTableBody,
  SessionTableItem,
} from "../../components/sessions/SessionTable.tsx";
import TitleBar from "../../components/TitleBar.tsx";

function Dashboard() {
  return (
    <Container>
      <TitleBar label="Class Name">
        <PrimaryButton>Create New Session</PrimaryButton>
      </TitleBar>
      <Divider />
      <ContentContainer>
        <Subtitle>Current Session</Subtitle>
        <InfoCards />
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
            <tr>
              <SessionTableItem style={{ width: "17.5rem" }}>
                2024.01.01
              </SessionTableItem>
              <SessionTableItem>asd</SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
            </tr>
            <tr>
              <SessionTableItem style={{ width: "17.5rem" }}>
                2024.01.01
              </SessionTableItem>
              <SessionTableItem>asd</SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
            </tr>
            <tr>
              <SessionTableItem style={{ width: "17.5rem" }}>
                2024.01.01
              </SessionTableItem>
              <SessionTableItem>asd</SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
            </tr>
            <tr>
              <SessionTableItem style={{ width: "17.5rem" }}>
                2024.01.01
              </SessionTableItem>
              <SessionTableItem>asd</SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
            </tr>
            <tr>
              <SessionTableItem style={{ width: "17.5rem" }}>
                2024.01.01
              </SessionTableItem>
              <SessionTableItem>asd</SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
              <SessionTableItem style={{ width: "17.5rem" }}>
                5
              </SessionTableItem>
            </tr>
          </SessionTableBody>
        </ElevatedSessionTable>
      </ContentContainer>
    </Container>
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

export default Dashboard;
